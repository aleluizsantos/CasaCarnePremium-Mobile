import React from "react";
import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import imgConfirmed from "../../assets/confirmed.png";
import imgHeader from "../../assets/imgHeader.png";
import imgLogo from "../../assets/Logo.png";

const ModalSucessAddCar = ({ open, toogle }) => {
  const navigation = useNavigation();

  const handleGoToCategory = () => {
    toogle(false);
    navigation.navigate("App", { screen: "Category" });
  };
  const handleGoToCart = () => {
    toogle(false);
    navigation.navigate("Car");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => toogle(!open)}
    >
      <View style={styles.container}>
        <View style={styles.contentModal}>
          <View style={styles.headerModal}>
            <Image source={imgHeader} style={styles.imgHeader} />
            <Image source={imgLogo} style={styles.imgLogo} />
          </View>
          <View style={styles.bodyModal}>
            <Text style={styles.titleHeader}>Item Adicionado</Text>
            <Image source={imgConfirmed} style={styles.imgConfirmed} />
          </View>

          <View style={styles.footerButtom}>
            <TouchableOpacity
              onPress={handleGoToCategory}
              style={styles.button}
            >
              <Text style={styles.textButton}>Continuar Comprando</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoToCart}
              style={styles.buttonOutline}
            >
              <Text style={styles.textButton}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSucessAddCar;
