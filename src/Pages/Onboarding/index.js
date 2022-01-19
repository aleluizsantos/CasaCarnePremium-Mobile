import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, Text } from "react-native";

import styles from "./styles";
import imgLogoTitle from "../../assets/logoTitle.png";
import MyOrderContext from "../../Contexts/myOrder";

const onboarding = () => {
  const navigation = useNavigation();
  const { itemCar } = useContext(MyOrderContext);

  function handleRegisterPerfil() {
    navigation.navigate("RegisterPerfil");
  }

  function handleGotoLogin() {
    const pageNavigation = itemCar.length > 0 ? "Car" : "App";
    navigation.navigate("Login", { page: pageNavigation });
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentBody}>
        <Image source={imgLogoTitle} style={styles.imgTitle} />
        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.subTitle}>
          Entrega rápida na comodidade de sua casa
        </Text>
        <Text style={styles.description}>
          Caso vocês já tenha efetuado seu cadastro, faça seu login!
        </Text>
      </View>
      <View style={styles.footerButton}>
        <View style={styles.contentButton}>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={handleRegisterPerfil}
          >
            <Text style={styles.textButtonOutline}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleGotoLogin}>
            <Text style={styles.textButton}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default onboarding;
