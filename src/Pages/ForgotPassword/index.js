import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ForgotPasswordImg from "../../assets/ForgotPassword.png";
import styles from "./styles";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validateInput, setValidateInput] = useState(false);

  const navigation = useNavigation();

  function handleForgotPassword() {
    if (!!email) {
      navigation.navigate("Login", { page: "Category" });
    } else {
      setValidateInput(true);
    }
  }

  function handleGoToLogin() {
    navigation.navigate("Login", { page: "Category" });
  }

  return (
    <View style={styles.container}>
      <Image source={ForgotPasswordImg} style={styles.imgForgotPassword} />
      <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      <Text style={styles.descriptionForgot}>
        Insira seu endereço de e-mail e enviaremos um link para redefinir sua
        senha
      </Text>
      <TextInput
        style={[styles.input, validateInput && !!!email && styles.validate]}
        keyboardType="email-address"
        placeholder="Digite seu e-mail"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.groupButton}>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleGoToLogin}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={handleForgotPassword}
        >
          <Text style={styles.textButtonReset}>Redefinir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgotPassword;
