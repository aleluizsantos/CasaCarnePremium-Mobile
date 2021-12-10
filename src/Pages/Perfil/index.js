import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TabRouter, useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

import Auth from "../../Contexts/auth";
import styles from "./styles";

function Perfil() {
  const { user, userChanger, passwordChange } = useContext(Auth);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [modalPasswordChange, setModalPasswordChange] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
    return () => (amoted = false);
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleUserChange() {
    const dataUser = {
      name,
      email,
      phone,
    };
    setIsLoading(true);
    userChanger(dataUser).then((response) => {
      setIsLoading(false);
      response.success
        ? setModalEditUser(!modalEditUser)
        : Alert.alert("Erro", response.error);
    });
  }

  function cleanFieldPassChanger() {
    setPasswordNew("");
    setPasswordOld("");
    setPasswordConfirm("");
    setModalPasswordChange(false);
  }

  async function handleUserChangePassword() {
    const dataPassChange = {
      oldPassword: passwordOld,
      newPassword: passwordNew,
    };
    if (
      passwordNew === passwordConfirm &&
      passwordNew !== "" &&
      passwordOld !== ""
    ) {
      setIsLoading(true);
      passwordChange(dataPassChange).then((response) => {
        if (response.success) {
          cleanFieldPassChanger();
          setIsLoading(false);
        } else {
          Alert.alert("Erro", response.error);
          passOldInput.focus();
          setPasswordOld("");
          setIsLoading(false);
        }
      });
    } else {
      setPasswordNew("");
      setPasswordConfirm("");
      passNewInput.focus();
      Alert.alert(
        "Senha não confere",
        "A senha digitada não são identicadas, tente novamente."
      );
    }
  }

  return (
    <View style={styles.container}>
      {/* MODAL EDITAR USUÁRIO */}
      <Modal animationType="fade" transparent={false} visible={modalEditUser}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.form}>
              <View>
                <TextInput
                  style={[
                    styles.input,
                    validateInput && !!!name && styles.validate,
                  ]}
                  autoFocus={true}
                  placeholder="Nome"
                  keyboardType="default"
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  blurOnSubmit={false}
                />
              </View>
              <View>
                <TextInput
                  style={[
                    styles.input,
                    validateInput && !!!email && styles.validate,
                  ]}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  blurOnSubmit={false}
                />
              </View>
              <View>
                <TextInputMask
                  style={[
                    styles.input,
                    validateInput && !!!phone && styles.validate,
                  ]}
                  placeholder="Telefone"
                  type={"cel-phone"}
                  value={phone}
                  onChangeText={setPhone}
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.containerButtonAdd}>
                <TouchableOpacity
                  style={styles.buttonCancelModal}
                  onPress={() => {
                    setModalEditUser(!modalEditUser);
                  }}
                >
                  <Text style={styles.titleButtonCancel}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonUpDatePerfil}
                  disabled={isLoading}
                  onPress={handleUserChange}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.titleButtonRegister}>Salvar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* MODAL ALTERAR SENHA */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalPasswordChange}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Alterar senha</Text>
            <View style={styles.form}>
              <View>
                <TextInput
                  ref={(input) => (passOldInput = input)}
                  style={styles.input}
                  placeholder="Senha antiga"
                  secureTextEntry={true}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  value={passwordOld}
                  onChangeText={setPasswordOld}
                  onSubmitEditing={() => passNewInput.focus()}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
              </View>
              <View>
                <TextInput
                  ref={(input) => (passNewInput = input)}
                  style={styles.input}
                  placeholder="Nova senha"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={passwordNew}
                  onChangeText={setPasswordNew}
                  onSubmitEditing={() => passCheckInput.focus()}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
              </View>
              <View>
                <TextInput
                  ref={(input) => (passCheckInput = input)}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Confirmar senha"
                  keyboardType="default"
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  returnKeyType="go"
                />
              </View>

              <View style={styles.containerButtonAdd}>
                <TouchableOpacity
                  style={styles.buttonCancelModal}
                  onPress={() => {
                    setModalPasswordChange(!modalPasswordChange);
                  }}
                >
                  <Text style={styles.titleButtonCancel}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonUpDatePerfil}
                  disabled={isLoading}
                  onPress={handleUserChangePassword}
                >
                  {isLoading ? (
                    <ActivityIndicator size={24} color="#fff" />
                  ) : (
                    <Text style={styles.titleButtonRegister}>Alterar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.avatar}>
        <Image
          source={require("../../assets/user.png")}
          style={styles.imgAvatar}
        />
        {/* <TouchableOpacity style={styles.buttonCamera} onPress={() => Alert.alert('teste')}>
                    <AntDesign name="camerao"
                        size={38}
                        color={colors.darker}
                        style={styles.cameraIcon}
                    />
                </TouchableOpacity> */}
      </View>
      <Text style={styles.titleUser}>{user.name.split(" ")[0]}</Text>

      <View style={styles.dataUser}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Senha</Text>
          <TouchableOpacity
            onPress={() => setModalPasswordChange(!modalPasswordChange)}
          >
            <Text style={styles.value}>********</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.groupButton}>
        <TouchableOpacity
          style={styles.buttonEditPerfil}
          onPress={() => setModalEditUser(!modalEditUser)}
        >
          <Text style={styles.textButton}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleGoBack}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Perfil;
