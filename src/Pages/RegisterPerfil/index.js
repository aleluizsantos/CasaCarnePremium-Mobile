import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text"; //https://github.com/benhurott/react-native-masked-text
import * as Yup from "yup";

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
  ActivityIndicator,
} from "react-native";

import auth from "../../Contexts/auth";
import Header from "../../Components/Header";
import api from "../../Services/api";

import styles from "./styles";
import { colors } from "../../Styles";

const schema = Yup.object().shape({
  name: Yup.string()
    .required({ name: "Nome obrigatório" })
    .min(3, { name: "O nome deve ter no mímino 3 caracteres!" })
    .max(80, { name: "O nome deve ter no mímino 80 caracteres!" }),

  email: Yup.string()
    .email({ email: "E-mail inválido!" })
    .required({ email: "E-mail Obrigatório" }),
  phone: Yup.string()
    .min(15, { phone: "Telefone tem no mínimo 15 digitos" })
    .required({ phone: "Número telefone obrigatório" }),
  password: Yup.string()
    .required("Senha obrigatória")
    .min(6, { password: "Senha deve conter no mínimo 6 caracteres" }),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required({ confirmPassword: "confirmação obrigatório" })
          .oneOf([Yup.ref("password")], {
            confirmPassword: "Senha não confere",
          })
      : field
  ),
});

const RegisterPerfil = () => {
  const navigation = useNavigation();
  const { signIn } = useContext(auth);
  const [tokenPushNotification, setTokenPushNotification] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    let mounted = true;
    mounted && getTokenPush();
    return () => (mounted = false);
  }, []);

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const hasMessageError = (field) =>
    formState.errors[field] ? formState.errors[field] : "";

  async function getTokenPush() {
    const storageTokenPush = await AsyncStorage.getItem(
      "@CasaCarnePremium:tokenPushNotification"
    );
    setTokenPushNotification(storageTokenPush);
  }
  function handleEve() {
    setIsSecureText(!isSecureText);
  }
  function handleGotGoToBack() {
    navigation.goBack();
  }
  async function handleSubmit() {
    if (formState.isValid) {
      setIsloading(true);
      const data = {
        ...formState.values,
        tokenPushNotification,
      };

      await api
        .post("auth/register", data)
        .then(() => {
          setIsloading(false);
          signIn(formState.values.email, formState.values.password);
          Alert.alert(
            "Sucesso",
            "Agora você deve informar o endereço de entrega!",
            [
              {
                text: "Informar endereço",
                onPress: () =>
                  navigation.navigate("RegisterAddress", { active: true }),
              },
            ]
          );
        })
        .catch(function (error) {
          if (error.response) {
            setIsloading(false);
            Alert.alert(
              "Desculpe",
              `O e-mail: '${formState.values.email}' já está cadastrado`
            );
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  }
  async function handleChange(ref, value) {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [ref]: value,
      },
      touched: {
        ...formState.touched,
        [ref]: true,
      },
    });
  }
  async function handleValidation() {
    let result = {};

    schema
      .validate(formState.values, { abortEarly: false })
      .then(() => {
        setFormState({
          ...formState,
          isValid: true,
          errors: result,
        });
      })
      .catch(function (err) {
        err.errors.forEach((item) => {
          const key = Object.keys(item);
          result[key] = item[key];
        });
        setFormState({
          ...formState,
          isValid: false,
          errors: result,
        });
      });
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
            Para finalizar seu pedido é necessário algumas informações, por
            gentileza preencha os campos abaixo.
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
                ref={(input) => {
                  nameInput = input;
                }}
                style={[styles.input, hasError("name") && styles.validate]}
                keyboardType="default"
                placeholder="Seu nome"
                autoCorrect={false}
                value={formState.values["name"] || ""}
                onChangeText={(value) => handleChange("name", value)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInput.focus();
                }}
                blurOnSubmit={false}
                onBlur={handleValidation}
              />
              {hasError("name") && (
                <Text style={styles.error}>{hasMessageError("name")}</Text>
              )}
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
                style={[styles.input, hasError("email") && styles.validate]}
                keyboardType="email-address"
                placeholder="Seu e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                value={formState.values["email"] || ""}
                onChangeText={(value) => handleChange("email", value)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInput.focus();
                }}
                blurOnSubmit={false}
                onBlur={handleValidation}
              />
              {hasError("email") && (
                <Text style={styles.error}>{hasMessageError("email")}</Text>
              )}
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
                style={[styles.input, hasError("phone") && styles.validate]}
                placeholder="Seu telefone"
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                value={formState.values["phone"] || ""}
                onChangeText={(value) => handleChange("phone", value)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInput.focus();
                }}
                blurOnSubmit={false}
                onBlur={handleValidation}
              />
              {hasError("phone") && (
                <Text style={styles.error}>{hasMessageError("phone")}</Text>
              )}
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
                style={[styles.input, hasError("password") && styles.validate]}
                placeholder="Senha"
                secureTextEntry={isSecureText}
                autoCapitalize="none"
                autoCorrect={false}
                value={formState.values["password"] || ""}
                onChangeText={(value) => handleChange("password", value)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmedInput.focus();
                }}
                blurOnSubmit={false}
                onBlur={handleValidation}
              />
              {hasError("password") && (
                <Text style={styles.error}>{hasMessageError("password")}</Text>
              )}
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
                  styles.input,
                  hasError("confirmPassword") && styles.validate,
                ]}
                placeholder="Confirme Senha"
                secureTextEntry={isSecureText}
                autoCapitalize="none"
                autoCorrect={false}
                value={formState.values["confirmPassword"] || ""}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                returnKeyType="go"
                onSubmitEditing={Keyboard.dismiss}
                onBlur={handleValidation}
              />
              {hasError("confirmPassword") && (
                <Text style={styles.error}>
                  {hasMessageError("confirmPassword")}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonCancelar}
              onPress={handleGotGoToBack}
            >
              <Text style={styles.titleButtonCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRegister}
              disabled={isloading}
              onPress={handleSubmit}
            >
              {isloading ? (
                <ActivityIndicator size={36} color={colors.white} />
              ) : (
                <Text style={styles.titleButtonRegister}>Registrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterPerfil;
