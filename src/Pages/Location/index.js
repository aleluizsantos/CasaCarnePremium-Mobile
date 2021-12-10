import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import imgHeader from "../../assets/imgHeader.png";
import imgLogo from "../../assets/Logo.png";
import api from "../../Services/api";
import Auth from "../../Contexts/auth";
import MyOrder from "../../Contexts/myOrder";

import styles from "./styles";

const Location = () => {
  const [openingHours, setOpeningHours] = useState([]);
  const { storeAddress } = useContext(Auth);
  const { openClose } = useContext(MyOrder);
  const navigation = useNavigation();

  const openGps = (lat, lng) => {
    const latitude = "-20.2553814";
    const longitude = "-50.5529795";
    const label = "Casa de Carne Premium, Jales, Brasil";

    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          "https://www.google.de/maps/@" +
          latitude +
          "," +
          longitude +
          "?q=" +
          label;
        return Linking.openURL(browser_url);
      }
    });
  };

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        await api
          .get("openingHours")
          .then((response) => setOpeningHours(response.data));
      })();
    }
    return () => (amoted = false);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={36} color="#ffffff" />
      </TouchableOpacity>

      {!openClose && <Text style={styles.openClose}>Loja fechada</Text>}
      <Image source={imgHeader} style={styles.imageHeader} />
      <Image source={imgLogo} style={styles.imageLogo} />

      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.title}>Casa de Carne Premium</Text>
        </View>

        <View style={styles.box}>
          <View>
            <View style={styles.fieldsGroup}>
              <Feather name="flag" size={24} color="black" />
              <TouchableOpacity onPress={() => openGps()}>
                <View style={styles.field}>
                  <Text>Endereço</Text>
                  <Text
                    style={styles.textFiel}
                  >{`${storeAddress.address}, ${storeAddress.number}, ${storeAddress.neighborhood}, ${storeAddress.city}/${storeAddress.uf}`}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldsGroup}>
              <Feather name="mail" size={24} color="black" />

              <View style={styles.field}>
                <Text>Email</Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `mailto:${storeAddress.email}?subject=📢 Fale conosco&body=O que podemos lhe ajudar.`
                    )
                  }
                >
                  <Text style={styles.textFiel}>{storeAddress.email}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldsGroup}>
              <Feather name="message-circle" size={24} color="black" />
              <View style={styles.field}>
                <Text>Telefone</Text>
                <Text style={styles.textFiel}>{storeAddress.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.title}>Horário de atendimento</Text>
          {openingHours.map((item, idx) => (
            <View key={idx} style={styles.fieldsGroup}>
              <Feather
                name="clock"
                size={24}
                color="black"
                style={{ fontSize: 16 }}
              />
              <View style={styles.field}>
                <Text>
                  {item.open
                    ? `${item.week} ${item.start} às ${item.end}`
                    : `${item.week} - Fechado`}
                </Text>
                {/* <Text>
                  
                </Text> */}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Location;
