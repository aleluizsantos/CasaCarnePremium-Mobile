import React, { useState, useContext, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";

import AuthContext from "../../Contexts/auth";
import Header from "../../Components/Header";
import api from "../../Services/api";
import styles from "./styles";
import { colors } from "../../Styles";
import { ScrollView } from "react-native-gesture-handler";

const RegisterAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, setUserAddress } = useContext(AuthContext);
  const [addressData, setAddressData] = useState([]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [active, setActive] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateAdrressId, setUpdateAddressId] = useState(null);
  const [pointReference, setPointReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        // Verificar se na rota estiver active = true abrir modal cadastro Endereço
        route.params?.active && setModalVisible(true);
        await api
          .get("address")
          .then((response) => setAddressData(response.data));
      })();
    }
    return () => (amoted = false);
  }, []);

  // Definir o endereço como Padrão
  async function handleActiveAddress(address) {
    if (address.active) {
      Alert.alert(
        "Ativar endereço padrão",
        "Seu endereço de entrega já é padrão."
      );
    } else {
      const newListAddress = addressData.map((item) => {
        if (item.id === address.id) {
          const addr = { ...item, active: true };
          AsyncStorage.setItem(
            "@CasaCarnePremium:UserAddress",
            JSON.stringify(addr)
          );
          setUserAddress(addr);
          return addr;
        } else {
          return { ...item, active: false };
        }
      });
      setAddressData(newListAddress);
      Alert.alert(
        "Alterado endereço padrão",
        "Seu endereço padrão de entrega foi alterado com sucesso."
      );
      await api.put(`/address/active/${address.id}`, {});
    }
  }

  // Excluir um endereço da lista
  async function handleDeleteAddress(_id) {
    await api.delete(`/address/delete/${_id}`).then(() => {
      const newAddr = addressData.filter((item) => item.id !== _id);
      setAddressData(newAddr);
    });
  }
  // Abre o modal com todos os campos vazios novo Endereço
  function handleAddAddress() {
    setCep("");
    setAddress("");
    setNumber("");
    setNeighborhood("");
    setCity("");
    setUf("");
    setPointReference("");
    setValidateInput(false);
    setActive(false);

    setModalVisible(!modalVisible);
  }
  // Carrega os dados no modal para atualizar
  function handleEditAddress(_itemAddress) {
    setAddress(_itemAddress.address);
    setCep(_itemAddress.cep);
    setCity(_itemAddress.city);
    setNeighborhood(_itemAddress.neighborhood);
    setNumber(_itemAddress.number);
    setUf(_itemAddress.uf);
    setActive(_itemAddress.active);
    setPointReference(_itemAddress.pointReference);

    setUpdateAddressId(_itemAddress.id); //Se possuir um id, indica campos para editar
    setValidateInput(false);

    setModalVisible(!modalVisible);
  }
  // Criar ou Editar um endereço
  async function handleSubmit() {
    if (Boolean(user)) {
      if (!!address && !!number && !!neighborhood && !!city && !!uf) {
        setIsLoading(true);
        const dataAddress = {
          cep,
          address,
          number,
          neighborhood,
          city,
          uf,
          pointReference,
          active:
            addressData.length <= 0 ? true : updateAdrressId ? active : false,
        };
        if (updateAdrressId !== null) {
          // Editar campo
          await api.put(`/address/${updateAdrressId}`, dataAddress).then(() => {
            editAddressDeleivery({ id: updateAdrressId, ...dataAddress });
          });
          setUpdateAddressId(null);
        } else {
          // Criar um novo endereço
          await api.post("/address/create", dataAddress).then((response) => {
            setAddressData([...addressData, response.data]);
          });
        }
        setModalVisible(!modalVisible);
        AsyncStorage.setItem(
          "@CasaCarnePremium:UserAddress",
          JSON.stringify(dataAddress)
        );
        setUserAddress(dataAddress);
        route.params?.active && navigation.navigate("Car");
      } else {
        setValidateInput(true);
      }
      setIsLoading(false);
    }
  }

  // Seta o CEP ao completar de digitar o CEP realiza um consulta api buscando
  // dados da localidade
  const handleSetCep = (value) => {
    const lenghtValue = value.length;
    if (lenghtValue === 9) queryCep(value);
    setCep(value);
  };
  // Realiza um consulta via get buscando o cep
  // https://viacep.com.br/ws/${parseCep}/json/`
  async function queryCep(cep) {
    setIsLoading(true);
    const parseCep = cep.replace(/[^0-9]/g, "");

    if (parseCep.length < 8) {
      return setCep("");
    }
    await axios
      .get(`https://viacep.com.br/ws/${parseCep}/json/`)
      .then((response) => {
        const { logradouro, bairro, localidade, uf } = response.data;
        if (logradouro === undefined) {
          Alert.alert(
            "Atenção",
            `O CEP '${cep}' não foi localizado, verifica se o CEP está correto, caso queira você pode prosseguir no cadastro sem o CEP.`
          );
          setCep("");
        } else {
          setAddress(logradouro);
          setNeighborhood(bairro);
          setCity(localidade);
          setUf(uf);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
      behavior="padding"
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {!!updateAdrressId && (
                <Text style={styles.titleUpdate}>Editar Endereço</Text>
              )}
              <View style={styles.form}>
                <View>
                  <View style={styles.Touchable}>
                    {isLoading && !Boolean(number) ? (
                      <ActivityIndicator color={colors.success} size="large" />
                    ) : (
                      <Feather name="link" size={24} style={styles.iconInput} />
                    )}
                  </View>
                  <TextInputMask
                    style={styles.input}
                    placeholder="CEP"
                    autoFocus={true}
                    type={"zip-code"}
                    value={cep}
                    onChangeText={(value) => handleSetCep(value)}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                    blurOnSubmit={false}
                  />
                </View>
                <View style={styles.fieldGroup}>
                  <View style={styles.groupAddress}>
                    <TextInput
                      style={[
                        styles.input,
                        validateInput && !!!address && styles.validate,
                      ]}
                      placeholder="Endereço"
                      value={address}
                      onChangeText={setAddress}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      blurOnSubmit={false}
                    />
                  </View>
                  <View style={styles.groupNumber}>
                    <TextInput
                      style={[
                        styles.input,
                        validateInput && !!!number && styles.validate,
                      ]}
                      keyboardType="decimal-pad"
                      placeholder="Nº"
                      value={number}
                      onChangeText={setNumber}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      validateInput && !!!neighborhood && styles.validate,
                    ]}
                    placeholder="Bairro"
                    keyboardType="default"
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                    blurOnSubmit={false}
                    // onBlur={() => queryCep(cep)}
                  />
                </View>
                <View style={styles.fieldGroup}>
                  <View style={styles.groupAddress}>
                    <TextInput
                      style={[
                        styles.input,
                        validateInput && !!!city && styles.validate,
                      ]}
                      placeholder="Cidade"
                      value={city}
                      onChangeText={setCity}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      blurOnSubmit={false}
                    />
                  </View>
                  <View style={styles.groupNumber}>
                    <TextInput
                      style={[
                        styles.input,
                        validateInput && !!!uf && styles.validate,
                      ]}
                      keyboardType="default"
                      placeholder="UF"
                      value={uf}
                      onChangeText={setUf}
                      returnKeyType="next"
                      onSubmitEditing={() => {}}
                      blurOnSubmit={false}
                    />
                  </View>
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ponto de Referencia"
                    keyboardType="default"
                    value={pointReference}
                    onChangeText={setPointReference}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                    blurOnSubmit={false}
                    // onBlur={() => queryCep(cep)}
                  />
                </View>

                <View style={styles.containerButtonAdd}>
                  <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setUpdateAddressId(null);
                    }}
                  >
                    <Text style={styles.titleButtonCancel}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRegister}
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    {isLoading && Boolean(number) ? (
                      <ActivityIndicator size={36} color={colors.white} />
                    ) : (
                      <Text style={styles.titleButtonRegister}>Salvar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Header goBack={true} />

      <View style={styles.body}>
        <View>
          <View style={styles.titleAddress}>
            <Text style={styles.titleBody}>Endereços cadastrados</Text>
            <Text style={styles.titleBody}> {addressData.length} </Text>
          </View>

          <FlatList
            data={addressData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.address,
                  item.active && {
                    borderLeftWidth: 8,
                    borderLeftColor: colors.success,
                  },
                ]}
              >
                <View>
                  <TouchableOpacity onPress={() => handleActiveAddress(item)}>
                    <Text
                      style={styles.textAddress}
                    >{`${item.address}, ${item.number}`}</Text>
                    <Text style={styles.textAddress}>
                      {item.neighborhood} - {item.cep}
                    </Text>
                    <Text
                      style={styles.textAddress}
                    >{`${item.city}/${item.uf}`}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.iconeAddress}>
                  <TouchableOpacity
                    onPress={() => handleEditAddress(item)}
                    style={styles.buttonAddress}
                  >
                    <Feather name="edit" size={24} color={colors.darker} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteAddress(item.id)}
                    style={styles.buttonAddress}
                  >
                    <Feather name="trash-2" size={24} color={colors.red} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonAdd} onPress={handleAddAddress}>
        <Feather name="plus-circle" size={48} color={colors.darker} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterAddress;
