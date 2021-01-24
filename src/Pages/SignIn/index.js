import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import AuthContext from "../../Contexts/auth";
import Header from "../../Components/Header";

import styles from "./styles";
import { colors } from "../../Styles";

const SignIn = () => {
  const { signIn, message, messageClean } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [validateInput, setValidateInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    !!message && setModalVisible(!modalVisible);
    setIsLoading(false);
    clearMessageError();
  }, [message]);

  function clearMessageError() {
    setTimeout(() => messageClean(), 10000);
  }

  function handleSignId() {
    if (!isLoading) {
      if (!!email && !!password) {
        setIsLoading(true);
        signIn(email, password);
      } else {
        setValidateInput(true);
      }
    }
  }

  function handleRegisterPerfil() {
    navigation.navigate("RegisterPerfil");
  }

  function handleEve() {
    setIsSecureText(!isSecureText);
  }

  function handleGoToForgotPassword() {
    navigation.navigate("ForgotPassword");
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Header />
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.titleBody}>
            Para iniciar o uso do aplicativo é necessario efetuar seu login!
          </Text>
          <Text style={styles.titleDescription}>
            Caso não tem, clique no botão registrar para fazer seu cadastro e
            aproveitar nossas ofertas.
          </Text>

          <View style={styles.form}>
            {!!message && <Text style={styles.messageError}>{message}</Text>}
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
                style={[
                  styles.input,
                  validateInput && !!!email && styles.validate,
                ]}
                keyboardType="email-address"
                placeholder="Digite seu e-mail"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
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
                style={[
                  styles.input,
                  validateInput && !!!password && styles.validate,
                ]}
                placeholder="Senha"
                secureTextEntry={isSecureText}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                returnKeyType="go"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          </View>

          <View style={styles.groupButton}>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={handleRegisterPerfil}
            >
              <Text style={styles.titleRegister}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={handleSignId}
            >
              {isLoading ? (
                <ActivityIndicator size={36} color={colors.white} />
              ) : (
                <Text style={styles.titleButtonSignIn}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleGoToForgotPassword}>
            <Text style={styles.TitleButtonEsqueci}>Esqueci senha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
