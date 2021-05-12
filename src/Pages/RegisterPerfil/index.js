import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInputMask } from "react-native-masked-text"; //https://github.com/benhurott/react-native-masked-text

import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";

import Header from "../../Components/Header";
import api from "../../Services/api";

import styles from "./styles";

const RegisterPerfil = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [validateInput, setValidateInput] = useState(false);

  const navigation = useNavigation();

  function handleEve() {
    setIsSecureText(!isSecureText);
  }

  function handleGotoLogin() {
    navigation.navigate("Login");
  }

  async function handleSubmit() {
    if (!!name && !!email && !!phone && !!password && !!passwordConfirmed) {
      if (password === passwordConfirmed) {
        const storageTokenPush = await AsyncStorage.getItem(
          "@Premium:tokenPushNotification"
        );
        await api
          .post("auth/register", {
            name,
            email,
            phone,
            password,
            tokenPushNotification: storageTokenPush,
          })
          .then((response) => {
            Alert.alert("Cadastro", "Realizado com sucesso!");
            navigation.navigate("Login");
          })
          .catch(function (error) {
            if (error.response) {
              Alert.alert("Erro", "E-mail já cadastrado");
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          });
      } else {
        Alert.alert("Atenção", "Sua senha não confere");
        setPassword("");
        setPasswordConfirmed("");
        setValidateInput(true);
      }
    } else {
      setValidateInput(true);
    }
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
      behavior="padding"
    >
      <Header />
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.titleBody}>Perfil</Text>
          <Text style={styles.titleDescription}>
            Para iniciarmos o nosso aplicativo é necessário algumas informações,
            por gentileza preencha os campos abaixo.
          </Text>
          <View style={styles.form}>
            <View>
              <View style={styles.Touchable}>
                <Feather
                  name="user"
                  size={24}
                  color="black"
                  style={styles.IconInput}
                />
              </View>
              <TextInput
                style={[
                  styles.input,
                  validateInput && !!!name && styles.validate,
                ]}
                keyboardType="default"
                placeholder="Seu nome"
                autoCorrect={false}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <View style={styles.Touchable}>
                <MaterialIcons
                  name="email"
                  size={24}
                  color="black"
                  style={styles.IconInput}
                />
              </View>
              <TextInput
                ref={(input) => {
                  emailInput = input;
                }}
                style={[
                  styles.input,
                  validateInput && !!!email && styles.validate,
                ]}
                keyboardType="email-address"
                placeholder="Seu e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <View style={styles.Touchable}>
                <MaterialIcons
                  name="phone"
                  size={24}
                  color="black"
                  style={styles.IconInput}
                />
              </View>
              <TextInputMask
                refInput={(input) => {
                  phoneInput = input;
                }}
                style={[
                  styles.input,
                  validateInput && !!!phone && styles.validate,
                ]}
                placeholder="Seu telefone"
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                value={phone}
                onChangeText={setPhone}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <View style={styles.Touchable}>
                <TouchableOpacity onPress={handleEve}>
                  <Feather
                    name={isSecureText ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                    style={styles.IconInput}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                ref={(input) => {
                  passwordInput = input;
                }}
                style={[
                  validateInput && !!!password && styles.validate,
                  styles.input,
                ]}
                placeholder="Senha"
                secureTextEntry={isSecureText}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmedInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <View style={styles.Touchable}>
                <TouchableOpacity onPress={handleEve}>
                  <Feather
                    name={isSecureText ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                    style={styles.IconInput}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                ref={(input) => {
                  passwordConfirmedInput = input;
                }}
                style={[
                  validateInput && !!!passwordConfirmed && styles.validate,
                  styles.input,
                ]}
                placeholder="Confirme Senha"
                secureTextEntry={isSecureText}
                autoCapitalize="none"
                autoCorrect={false}
                value={passwordConfirmed}
                onChangeText={setPasswordConfirmed}
                returnKeyType="go"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonCancelar}
              onPress={handleGotoLogin}
            >
              <Text style={styles.titleButtonCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={handleSubmit}
            >
              <Text style={styles.titleButtonRegister}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterPerfil;
