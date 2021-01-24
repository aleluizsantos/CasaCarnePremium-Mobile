import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
} from "react-native";

import Requests from "../../Contexts/requests";
import ModalShow from "../../Components/ModalShow";
import styles from "./styles";
import Header from "../../Components/Header";
import { colors, formatMoney } from "../../Styles";
import shopping from "../../assets/shopping.png";
import api from "../../Services/api";
import ModalNotice from "../../Components/ModalNotice";

const Payments = () => {
  const {
    itemCar,
    paymentType,
    addPaymentType,
    deliveryType,
    addDeliveryType,
    validationCoupom,
    totalCar,
    checkout,
    addressStore,
  } = useContext(Requests);
  const navigation = useNavigation();
  const route = useRoute();
  const [dateSelected, setDateSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [dateTimeScheduling, setdateTimeScheduling] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [dataPaymentType, setDataPaymentType] = useState([]);
  const [dataDeliveryType, setDataDeliveryType] = useState([]);
  const [showModalDeliveryType, setshowModalDeliveryType] = useState(false);
  const [showModalAddress, setshowModalAddress] = useState(false);
  const [showModalPayment, setshowModalPayment] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const [selectNumber, setSelectNumber] = useState("");
  const [selectNeighborhood, setSelectNeighborhood] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectUf, setSelectUf] = useState("");
  const [pointReference, setPointReference] = useState("");
  const [coupon, setCoupon] = useState("");
  const [statusCoupon, setStatusCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [modal, setModal] = useState(false);

  const { vTaxaDelivery } = route.params;

  useEffect(() => {
    let isCancelled = true;
    async function loadData() {
      Promise.all([api.get("payment"), api.get("deliveryType")]).then(
        ([pay, deliv]) => {
          if (isCancelled) {
            setDataPaymentType(pay.data);
            setDataDeliveryType(deliv.data);
            setIsLoading(false);
          }
        }
      );
    }
    loadData();
    return () => {
      isCancelled = false;
    };
  }, []);

  useEffect(() => {
    let isCancelled = true;
    async function loadAddress() {
      navigation.addListener("focus", () => setIsLoading(!isLoading));

      await api.get("address").then((addr) => {
        setDataAddress(addr.data);
        const activeAddr = addr.data.find((item) => !!item.active);

        if (activeAddr !== undefined && isCancelled) {
          setSelectAddress(activeAddr.address);
          setSelectNumber(activeAddr.number);
          setSelectNeighborhood(activeAddr.neighborhood);
          setSelectCity(activeAddr.city);
          setSelectUf(activeAddr.uf);
          setPointReference(activeAddr.pointReference);
        }
        setIsLoading(false);
      });
    }
    loadAddress();
    return () => {
      isCancelled = false;
    };
  }, [isLoading, navigation]);

  let formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleCleanSchedule() {
    setDateSelected("");
    setTimeSelected("");
  }

  function handleConfirm(_date) {
    const datetime = formatter.format(_date);
    const [date, time] = datetime.split(" ");
    setdateTimeScheduling(datetime);
    setDateSelected(date);
    setTimeSelected(time);
    hideDatePicker();
    //console.log(teste.toLocaleString('pt-br', {timezone: 'Brazil/brt'}));
  }

  function handleUpdateDeliveryType(_item) {
    addDeliveryType(_item);
    setshowModalDeliveryType(!showModalDeliveryType);
  }

  function handleUpdateAddress(_item) {
    setSelectAddress(_item.address);
    setSelectNumber(_item.number);
    setSelectNeighborhood(_item.neighborhood);
    setSelectCity(_item.city);
    setSelectUf(_item.uf);
    setshowModalAddress(!showModalAddress);
  }

  function handleNavigationToRegisterAddress() {
    setshowModalAddress(!showModalAddress);
    navigation.navigate("RegisterAddress");
  }

  async function handleTypePayment(itemPayment) {
    addPaymentType(itemPayment);
    !!paymentType && setshowModalPayment(!showModalPayment);
    setCoupon("");
    setDiscount(0);
  }

  async function handleValidationCoupon() {
    if (!!coupon) {
      await validationCoupom(coupon).then((resp) => {
        if (!!resp.Success) {
          const disc = Number(resp.Coupon.discountAmount) / 100;
          const totalDiscount = totalCar * disc;
          setDiscount(totalDiscount);
        } else {
          setDiscount(0);
        }
        setStatusCoupon(resp);
      });
    }
  }

  function handleNavigationToMyOrders() {
    setModal(!modal);
    navigation.navigate("MyOrder");
  }

  async function handleCkeckout() {
    // Verificar se todos campos necessário forma preenchidos
    if (!!deliveryType && !!paymentType.id) {
      // 1=DELIVERY | 2=RETIRAR NA LOJA
      const dataRequest = {
        deliveryType_id: deliveryType,
        statusRequest_id: 1, //Por padrão o status do pedido inicia em 1=Em Analise
        payment_id: paymentType.id,
        coupon: coupon,
        note: note,
        address: deliveryType === 2 ? addressStore.address : selectAddress,
        number: deliveryType === 2 ? addressStore.number : selectNumber,
        neighborhood:
          deliveryType === 2 ? addressStore.neighborhood : selectNeighborhood,
        city: deliveryType === 2 ? addressStore.city : selectCity,
        uf: deliveryType === 2 ? addressStore.uf : selectUf,
        PointReferences: deliveryType === 2 ? "" : pointReference,
        scheduleDateTime: dateTimeScheduling,
        items: itemCar,
      };

      if (deliveryType === 1 && !!!selectAddress) {
        setValidateInput(true);
        Alert.alert(
          "Atenção",
          "Faltando dado importante, verificar campo destacado."
        );
      } else {
        setModal(!modal);

        await api.post("request/create", dataRequest).then((response) => {
          setDateSelected("");
          setTimeSelected("");
          setSelectAddress("");
          setSelectNumber("");
          setSelectNeighborhood("");
          setSelectCity("");
          setSelectUf("");
          setPointReference("");
          setNote("");
          setCoupon("");
          setStatusCoupon("");
          setdateTimeScheduling("");
          setDiscount("");
          checkout();
        });
      }
    } else {
      setValidateInput(true);
      Alert.alert(
        "Atenção",
        "Faltando dado importante, verificar campo destacado."
      );
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={48} color={colors.white} />
        <Text style={styles.textProcessing}>PROCESSANDO</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Header goBack={true} />
      {/* Modal de finalização de compra */}
      <ModalNotice show={modal} close={() => handleNavigationToMyOrders()} />
      {/* Scrooll contendo todo os item para finalizar pedido */}
      <ScrollView>
        {/* Detalhes da finalização do pedido */}
        <View style={styles.body}>
          {/* Tipo de ENTREGA */}
          <>
            <View style={styles.titleItem}>
              <FontAwesome5 name="opencart" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>Tipo de Entrega</Text>
            </View>

            {dataDeliveryType.map(
              (itemDeliv) =>
                itemDeliv.id === deliveryType && (
                  <View key={itemDeliv.id} style={styles.groupInline}>
                    <Text style={styles.textDelivery}>
                      {itemDeliv.description}
                    </Text>
                    <BorderlessButton
                      onPress={() =>
                        setshowModalDeliveryType(!showModalDeliveryType)
                      }
                    >
                      <FontAwesome5
                        name="ellipsis-h"
                        size={24}
                        color={colors.primary}
                      />
                    </BorderlessButton>
                  </View>
                )
            )}

            <ModalShow title="Tipo de Entrega" visible={showModalDeliveryType}>
              {dataDeliveryType.map((item) => (
                /* 1=DELIVERY | 2=RETIRAR NA LOJA */
                <TouchableOpacity
                  onPress={() => handleUpdateDeliveryType(item.id)}
                  key={item.id}
                  style={[
                    styles.buttomModal,
                    item.id === deliveryType && styles.active,
                  ]}
                >
                  <Text style={styles.textDelivery}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </ModalShow>
          </>

          {/* Endereço de entrega */}
          {/* 1=DELIVERY | 2=RETIRAR NA LOJA  */}
          {deliveryType !== 2 ? (
            <>
              <View
                style={[
                  styles.titleItem,
                  validateInput && !!!selectAddress && styles.validation,
                ]}
              >
                <Entypo name="location" size={24} color={colors.dark} />
                <Text style={styles.labelItem}>Endereço de entrega</Text>
              </View>

              {!!selectAddress ? (
                <View style={styles.groupInline}>
                  <View>
                    <Text
                      style={styles.textAddress}
                    >{`${selectAddress}, ${selectNumber}`}</Text>
                    <Text style={styles.textneighborhood}>
                      {`${selectNeighborhood}, ${selectCity}/${selectUf}`}
                    </Text>
                  </View>
                  <BorderlessButton
                    onPress={() => setshowModalAddress(!showModalAddress)}
                  >
                    <FontAwesome5
                      name="ellipsis-h"
                      size={24}
                      color={colors.primary}
                    />
                  </BorderlessButton>
                </View>
              ) : (
                <View style={styles.groupInline}>
                  <View>
                    <Text style={styles.textAddress}>Não existe endereço</Text>
                  </View>
                  <BorderlessButton
                    onPress={() => setshowModalAddress(!showModalAddress)}
                  >
                    <FontAwesome5
                      name="ellipsis-h"
                      size={24}
                      color={colors.primary}
                    />
                  </BorderlessButton>
                </View>
              )}

              <ModalShow title="Selecionar endereço" visible={showModalAddress}>
                {dataAddress.length <= 0 ? (
                  <Text style={styles.textAddressNotExist}>
                    {" "}
                    Não existe endereço para entrega, cadastre seu endereço para
                    concluir sua compra.
                  </Text>
                ) : (
                  dataAddress.map((itemAddress) => (
                    <TouchableOpacity
                      key={itemAddress.id}
                      onPress={() => handleUpdateAddress(itemAddress)}
                      style={[
                        styles.buttomSelectAddress,
                        itemAddress.address === selectAddress &&
                          styles.addressActive,
                      ]}
                    >
                      <View>
                        <Text
                          style={styles.textAddress}
                        >{`${itemAddress.address}, ${itemAddress.number}`}</Text>
                        <Text style={styles.textneighborhood}>
                          {`${itemAddress.neighborhood}, ${itemAddress.city}/${itemAddress.uf}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
                <View style={styles.containerButtonAdd}>
                  <TouchableOpacity
                    style={styles.buttonNewAddress}
                    onPress={handleNavigationToRegisterAddress}
                  >
                    <Text style={styles.titleButtonNewAddress}>Novo</Text>
                  </TouchableOpacity>
                </View>
              </ModalShow>
            </>
          ) : (
            <>
              {/* Endereço RETIRADA na loja */}
              <View style={styles.titleItem}>
                <Entypo name="location" size={24} color={colors.dark} />
                <Text style={styles.labelItem}>Endereço para retirar</Text>
              </View>

              <View style={styles.addressLoja}>
                <Text style={styles.textAddress}>
                  {addressStore.address}, {addressStore.number}
                </Text>
                <Text style={styles.textneighborhood}>
                  {addressStore.neighborhood}, {addressStore.city},{" "}
                  {addressStore.uf} - {addressStore.phone}
                </Text>
              </View>
            </>
          )}

          {/* Forma de pagamento */}
          <>
            <View
              style={[
                styles.titleItem,
                validateInput && !!!paymentType && styles.validation,
              ]}
            >
              <Entypo name="credit" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>Forma de pagamento</Text>
            </View>
            {!!paymentType ? (
              <View style={styles.paymentSelect}>
                <Text style={styles.textAddress}>{paymentType.type}</Text>
                <BorderlessButton
                  onPress={() => setshowModalPayment(!showModalPayment)}
                >
                  <FontAwesome5
                    name="ellipsis-h"
                    size={24}
                    color={colors.primary}
                  />
                </BorderlessButton>

                <ModalShow
                  title="Forma de Pagamento"
                  visible={showModalPayment}
                >
                  {dataPaymentType.map((itemPay) => (
                    <TouchableOpacity
                      key={itemPay.id}
                      onPress={() => handleTypePayment(itemPay)}
                      style={[
                        styles.buttomSelectAddress,
                        itemPay.id === paymentType.id && styles.addressActive,
                      ]}
                    >
                      <Text style={styles.textAddress}>{itemPay.type}</Text>
                    </TouchableOpacity>
                  ))}
                </ModalShow>
              </View>
            ) : (
              <>
                {dataPaymentType.map((itemPay) => (
                  <View key={itemPay.id} style={styles.ListPayments}>
                    <TouchableOpacity
                      onPress={() => handleTypePayment(itemPay)}
                      style={styles.buttonPayments}
                    >
                      <FontAwesome5
                        name="circle"
                        size={15}
                        color={colors.darker}
                        style={{ marginRight: 10 }}
                      />
                      <Text style={styles.textAddress}>{itemPay.type}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          </>

          {/* Agendamento */}
          <>
            <View style={styles.titleItem}>
              <Entypo name="calendar" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>Agendamentos</Text>
            </View>
            {!!dateSelected ? (
              <View style={styles.Scheduling}>
                <View style={styles.groupScheduling}>
                  <Text style={styles.textSchedule}>
                    Sua entrega esta programada para o dia:
                  </Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <Text style={styles.textButtonDate}>
                      {dateSelected} {timeSelected}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleCleanSchedule}>
                  <Entypo name="trash" size={20} color={colors.red} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.groupSchedule}>
                <Text style={styles.textAddress}>Agende sua entrega.</Text>
                <BorderlessButton onPress={showDatePicker}>
                  <FontAwesome5
                    name="ellipsis-h"
                    size={24}
                    color={colors.primary}
                  />
                </BorderlessButton>
              </View>
            )}
            <View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                display="spinner"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </>

          {/* Observações adicionais */}
          <>
            <View style={styles.titleItem}>
              <Entypo name="typing" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>Observações adicionais</Text>
            </View>

            <TextInput
              placeholder="Suas observações."
              numberOfLines={4}
              style={styles.inputObservation}
              value={note}
              onChangeText={setNote}
              multiline={true}
            />
          </>
        </View>

        {/* Totais da Compra */}
        <View style={styles.totalContent}>
          <View>
            <Text style={styles.titleTotal}>
              Caso você tenha um cupom, insira o código no campo abaixo
            </Text>

            {!!coupon &&
              statusCoupon.Success !== undefined &&
              !!!statusCoupon.Success && (
                <Text style={styles.textCoupon}>{statusCoupon.Message}</Text>
              )}
            <View style={styles.inputBlock}>
              <View style={styles.groupCoupon}>
                <TextInput
                  style={[styles.input, { textAlign: "center" }]}
                  placeholder="CUPOM"
                  maxLength={10}
                  autoCapitalize="characters"
                  value={coupon}
                  onChangeText={setCoupon}
                />
                {!!statusCoupon.Success
                  ? !!coupon &&
                    !!statusCoupon.Success && (
                      <Entypo
                        style={styles.checkSuccess}
                        name="check"
                        size={24}
                        color={colors.success}
                      />
                    )
                  : !!coupon &&
                    statusCoupon.Success !== undefined && (
                      <Entypo
                        style={styles.checkSuccess}
                        name="emoji-sad"
                        size={24}
                        color={colors.red}
                      />
                    )}
              </View>
              <BorderlessButton
                style={[styles.button, !!!coupon && styles.buttonDisable]}
                onPress={handleValidationCoupon}
                enabled={!!coupon}
                rippleColor={colors.primary}
              >
                <Text style={styles.textButtonApply}>Aplicar</Text>
              </BorderlessButton>
            </View>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.labelTotal}>SubTotal</Text>
            <Text style={styles.labelValueTotal}>{formatMoney(totalCar)}</Text>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.labelTotal}>Desconto</Text>
            <Text style={styles.labelValueTotal}>{formatMoney(discount)}</Text>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.labelTotal}>Taxa de entrega</Text>
            <Text style={styles.labelValueTotal}>
              {formatMoney(vTaxaDelivery)}
            </Text>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.labelTotalEnd}>Total</Text>
            <Text style={styles.labelValueEnd}>
              {formatMoney(parseFloat(vTaxaDelivery) + totalCar - discount)}
            </Text>
          </View>

          <BorderlessButton
            onPress={handleCkeckout}
            style={styles.buttonConfirm}
            rippleColor={colors.primary}
          >
            <Text style={styles.textButtonConfirm}>FINALIZAR PEDIDO</Text>
          </BorderlessButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Payments;
