import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import imgHeader from "../../assets/imgHeader.png";

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={36} color="#ffffff" />
      </TouchableOpacity>
      <Image source={imgHeader} style={styles.imageHeader} />
      <Image
        source={{
          uri: "https://res.cloudinary.com/lesoftware/image/upload/v1630896420/lesoftware/logoLesoftware-write_fahfxl.png",
        }}
        style={styles.imageLogo}
      />

      <View style={styles.box}>
        <Text style={styles.title}>LESOFTWARE</Text>
        <Text style={styles.subTitle}>Desenvolvimento de aplicativos</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.fieldsGroup}>
          <Feather name="flag" size={24} color="black" />
          <View style={styles.field}>
            <Text>WEB</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("https:\\lesoftware.com.br")}
            >
              <Text style={styles.textFiel}>www.lesoftware.com.br</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldsGroup}>
          <Feather name="mail" size={24} color="black" />
          <View style={styles.field}>
            <Text>Email</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "mailto:dev.lesoftware@gmail.com?subject=Fale conosco&body=O que podemos lhe ajudar."
                )
              }
            >
              <Text style={styles.textFiel}>dev.lesoftware@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldsGroup}>
          <Feather name="message-circle" size={24} color="black" />
          <View style={styles.field}>
            <Text>Contatos/Suporte</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:+55 17 99602-2159`)}
            >
              <Text style={styles.textFiel}>+55 17 99602-2159</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:+55 17 98826-0129`)}
            >
              <Text style={styles.textFiel}>+55 17 98826-0129</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default About;
