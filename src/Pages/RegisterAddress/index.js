import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
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

import Header from "../../Components/Header";
import api from "../../Services/api";
import styles from "./styles";
import { colors } from "../../Styles";

const RegisterAddress = () => {
  const navigation = useNavigation();
  const [listAdrress, setListAdrress] = useState([]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [active, setActive] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateAdrressId, setUpdateAddressId] = useState("");
  const [pointReference, setPointReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Carregar os endereços do usuário
  useEffect(() => {
    async function loadingAddress() {
      await api
        .get("/address")
        .then((response) => {
          setListAdrress(response.data);
        })
        .catch((error) => {
          console.log("Page-address", error);
        });
    }
    loadingAddress();
  }, []);

  async function handleDeleteAddress(_id) {
    const responseDelete = await api.delete(`/address/delete/${_id}`);

    if (!!responseDelete) {
      const newListAddress = listAdrress.filter((item) => {
        return item.id !== _id;
      });
      setListAdrress(newListAddress);
    }
  }

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

  function handleEditAddress(_itemAddress) {
    setAddress(_itemAddress.address);
    setCep(_itemAddress.cep);
    setCity(_itemAddress.city);
    setNeighborhood(_itemAddress.neighborhood);
    setNumber(_itemAddress.number);
    setUf(_itemAddress.uf);
    setActive(_itemAddress.active);
    setPointReference(_itemAddress.pointReference);

    setUpdateAddressId(_itemAddress.id);
    setValidateInput(false);

    setModalVisible(!modalVisible);
  }

  async function handleSubmit() {
    if (!!address && !!number && !!neighborhood && !!city && !!uf) {
      const dataAddress = {
        cep,
        address,
        number,
        neighborhood,
        city,
        uf,
        pointReference,
        active: listAdrress.length <= 0 ? true : false,
      };

      await api.post("/address/create", dataAddress);

      setListAdrress([...listAdrress, dataAddress]);
      setModalVisible(!modalVisible);
    } else {
      setValidateInput(true);
    }
  }

  // Seta o CEP ao completar de digitar o CEP realiza um consulta api buscando
  // dados da localidade
  const handleSetCep = (value) => {
    const lenghtValue = value.length;
    if (lenghtValue === 9) queryCep(value);
    setCep(value);
  };

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
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!!updateAdrressId && (
              <Text style={styles.titleUpdate}>Editar Endereço</Text>
            )}
            <View style={styles.form}>
              <View>
                <View style={styles.Touchable}>
                  {isLoading ? (
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
                  style={styles.buttonRegister}
                  onPress={handleSubmit}
                >
                  <Text style={styles.titleButtonRegister}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setUpdateAddressId("");
                  }}
                >
                  <Text style={styles.titleButtonCancel}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Header goBack={true} />
      <View style={styles.body}>
        <View>
          <View style={styles.titleAddress}>
            <Text style={styles.titleBody}>Endereços cadastrados</Text>
            <Text style={styles.titleBody}> {listAdrress.length} </Text>
          </View>

          <FlatList
            data={listAdrress}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(itemAddress) => Number(itemAddress.id)}
            renderItem={({ item }) => (
              <View style={styles.address}>
                <View>
                  <Text
                    style={styles.textAddress}
                  >{`${item.address}, ${item.number}`}</Text>
                  <Text style={styles.textAddress}>
                    {item.neighborhood} - {item.cep}
                  </Text>
                  <Text
                    style={styles.textAddress}
                  >{`${item.city}/${item.uf}`}</Text>
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
