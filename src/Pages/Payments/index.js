import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import MyOrderContext from "../../Contexts/myOrder";
import AuthContext from "../../Contexts/auth";
import ModalShow from "../../Components/ModalShow";
import styles from "./styles";
import Header from "../../Components/Header";
import { colors, formatMoney } from "../../Styles";
import ModalNotice from "../../Components/ModalNotice";

const type = {
  DELIVERY: 1,
  RETIRAR_LOJA: 2,
  AGENDADO: 3,
};

const Payments = () => {
  const {
    openClose, //Existe Estabelecimento aberto ou Fechado true/false
    itemCar, //Lista de objetos contendo os produtos comprados
    totalCar, //Total dos items comprados
    taxaDelivery, //Taxa de entrega carregada ao inicial o APP
    selectedTypeDelivery, //Tipo de entrega selecionada pelo usuário
    setSelectedTypeDelivery, //Function para altera o tipo de entrega
    selectedTypePayment, //Tipo de pagamento selecionado na page Payment
    setselectedTypePayment, //Function para altear o tipo de pagamento
    typeDelivery, //Array com os tipos de delivery
    typePayments, //Array com todos tipos de pagamentos
    checkout, //Function para finalizar o pedido
  } = useContext(MyOrderContext);

  const { signOut, userAddress, storeAddress } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showModalDeliveryType, setshowModalDeliveryType] = useState(false);
  const [showModalPayment, setshowModalPayment] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [modal, setModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [note, setNote] = useState("");
  const [cash, setCash] = useState();

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (() => {
        !openClose && signOut();
        selectedTypeDelivery?.id && selectedTypeDelivery?.id !== 2
          ? totalCar >= taxaDelivery.vMinTaxa && taxaDelivery.vMinTaxa > 0
            ? setTaxa(0)
            : setTaxa(Number(taxaDelivery.taxa))
          : setTaxa(0);
      })();
    }
    return () => (amoted = false);
  }, [openClose, selectedTypeDelivery]);

  function handleUpdateDeliveryType(_item) {
    setSelectedTypeDelivery(_item);
    setshowModalDeliveryType(!showModalDeliveryType);
  }
  function handleUpdateAddress() {
    navigation.navigate("RegisterAddress");
  }
  async function handleTypePayment(itemPayment) {
    setshowModalPayment(false);
    setselectedTypePayment(itemPayment);
    setDiscount(0);
  }
  function handleNavigationToMyOrders() {
    setModal(!modal);
    navigation.navigate("MyOrder");
  }
  const ListTypePayments = () => {
    return typePayments.map((itemPay) => (
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
          <Image
            source={{ uri: itemPay.image_url }}
            style={{ height: 20, width: 50 }}
          />
          <Text style={styles.textAddress}>{itemPay.type}</Text>
        </TouchableOpacity>
      </View>
    ));
  };
  const PaymentSelected = () => {
    return (
      <>
        <View style={styles.paymentSelect}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: selectedTypePayment.image_url }}
              style={{ height: 20, width: 50 }}
            />
            <Text style={styles.textAddress}>{selectedTypePayment?.type}</Text>
          </View>
          <BorderlessButton
            onPress={() => setshowModalPayment(!showModalPayment)}
          >
            <FontAwesome5 name="ellipsis-h" size={24} color={colors.primary} />
          </BorderlessButton>

          <ModalShow title="Forma de Pagamento" visible={showModalPayment}>
            {typePayments.map((itemPay) => (
              <TouchableOpacity
                key={itemPay.id}
                onPress={() => handleTypePayment(itemPay)}
                style={[
                  styles.buttomSelectAddress,
                  itemPay.id === selectedTypePayment.id && styles.addressActive,
                ]}
              >
                <Image
                  source={{ uri: itemPay.image_url }}
                  style={{ height: 20, width: 45 }}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.textAddress,
                    itemPay.id === selectedTypePayment.id &&
                      styles.textAddressActive,
                  ]}
                >
                  {itemPay.type}
                </Text>
              </TouchableOpacity>
            ))}
          </ModalShow>
        </View>
      </>
    );
  };
  const TotalPurchase = () => {
    return (
      <View style={styles.totalContent}>
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
          <Text style={styles.labelValueTotal}>{formatMoney(taxa)}</Text>
        </View>
        <View style={styles.fieldBlock}>
          <Text style={styles.labelTotalEnd}>Total</Text>
          <Text style={styles.labelValueEnd}>
            {formatMoney(totalCar - discount + taxa)}
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
    );
  };
  async function handleCkeckout() {
    const formData = {
      note,
      cash,
      selectedAddress:
        selectedTypeDelivery.id === type.DELIVERY ? userAddress : storeAddress,
    };
    // Checar se o usuário selecionou algum tipo de pagamento
    if (!Boolean(selectedTypePayment.type)) {
      setValidateInput(true);
      Alert.alert("Pagamento", "Você não escolheu o forma de pagamento", [
        { text: "Definir tipo de pagamento" },
      ]);
      return;
    }
    checkout(formData);
    setModal(true);
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Header goBack={true} />
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

            <View style={styles.groupInline}>
              <Text style={styles.textDelivery}>
                {selectedTypeDelivery.description}
              </Text>
              <BorderlessButton
                onPress={() => setshowModalDeliveryType(!showModalDeliveryType)}
              >
                <FontAwesome5
                  name="ellipsis-h"
                  size={24}
                  color={colors.primary}
                />
              </BorderlessButton>
            </View>

            <ModalShow title="Tipo de Entrega" visible={showModalDeliveryType}>
              {typeDelivery.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleUpdateDeliveryType(item)}
                  style={[
                    styles.buttomModal,
                    item.id === selectedTypeDelivery.id && styles.active,
                  ]}
                >
                  <Text
                    style={[
                      styles.textDelivery,
                      item.id === selectedTypeDelivery.id && styles.textActive,
                    ]}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ModalShow>
          </>
          {/* Endereço de entrega */}
          <>
            <View style={styles.titleItem}>
              <Entypo name="location" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>
                {selectedTypeDelivery.id === type.DELIVERY
                  ? "Endereço de entrega"
                  : "Endereço para Retirada"}
              </Text>
            </View>
            <View style={styles.groupInline}>
              {selectedTypeDelivery.id === type.DELIVERY ? (
                <>
                  <View>
                    <Text
                      style={styles.textAddress}
                    >{`${userAddress.address}, ${userAddress.number}`}</Text>
                    <Text style={styles.textneighborhood}>
                      {`${userAddress.neighborhood}, ${userAddress.city}/${userAddress.uf}`}
                    </Text>
                  </View>
                  <BorderlessButton onPress={() => handleUpdateAddress()}>
                    <FontAwesome5
                      name="ellipsis-h"
                      size={24}
                      color={colors.primary}
                    />
                  </BorderlessButton>
                </>
              ) : (
                <View>
                  <Text
                    style={styles.textAddress}
                  >{`${storeAddress.address}, ${storeAddress.number}`}</Text>
                  <Text style={styles.textneighborhood}>
                    {`${storeAddress.neighborhood}, ${storeAddress.city}/${storeAddress.uf}`}
                  </Text>
                </View>
              )}
            </View>
          </>
          {/* Forma de pagamento */}
          <>
            <View
              style={[
                styles.titleItem,
                validateInput &&
                  !Boolean(selectedTypePayment.type) &&
                  styles.validation,
              ]}
            >
              <Entypo name="credit" size={24} color={colors.dark} />
              <Text style={styles.labelItem}>Forma de pagamento</Text>
            </View>
            {!Boolean(selectedTypePayment.type) ? (
              <ListTypePayments />
            ) : (
              <PaymentSelected />
            )}
            {selectedTypePayment.type === "Dinheiro" && (
              <View style={styles.inputBlock}>
                <Text style={styles.contentThing}>Troco para</Text>
                <View>
                  <TextInput
                    style={[styles.input, { width: 180 }]}
                    keyboardType="numeric"
                    placeholder="0.00"
                    value={cash}
                    onChangeText={setCash}
                  />
                </View>
              </View>
            )}
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
        <TotalPurchase />

        {/* Totais da Compra */}
      </ScrollView>

      {/* Modal de finalização de compra */}
      <ModalNotice show={modal}>
        <Text style={styles.title}>Pedido Finalizado</Text>
        <Text style={styles.text}>
          Sr(a) cliente, seu pedido foi enviado a nossa loja.
        </Text>
        <Text style={styles.text}>
          Em poucos minutos, entregaremos seu pedido. Volte sempre.
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleNavigationToMyOrders()}
        >
          <Text style={styles.textButtonApply}>Fechar</Text>
        </TouchableOpacity>
      </ModalNotice>
    </KeyboardAvoidingView>
  );
};

export default Payments;
