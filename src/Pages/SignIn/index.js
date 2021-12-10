import React, { useState, useContext, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const navigation = useNavigation();
  const route = useRoute();
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureText, setIsSecureText] = useState(true);
  const [validateInput, setValidateInput] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exponentPushToken, setExponentPushToken] = useState("");

  useEffect(() => {
    (async () => {
      const pushToken = await AsyncStorage.getItem(
        "@CasaCarnePremium:tokenPushNotification"
      );
      setExponentPushToken(pushToken);
    })();
  }, []);

  async function handleSignId() {
    if (!isLoading) {
      if (!!email && !!password) {
        setIsLoading(true);
        signIn(email, password, exponentPushToken).then((resp) => {
          if (resp.error) {
            setMessage(resp.error);
          } else {
            route.params?.page
              ? navigation.navigate(route.params?.page)
              : navigation.navigate("App", { screen: "Category" });
          }
          setIsLoading(false);
        });
      } else {
        setValidateInput(true);
      }
    }
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
      <Header goBack={true} />
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
            {Boolean(message) && (
              <Text style={styles.messageError}>{message}</Text>
            )}
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
