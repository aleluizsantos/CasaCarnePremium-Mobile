import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import io from "socket.io-client";
import configApp from "../../../app.json";

import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AuthContext from "../../Contexts/auth";
import RequestContext from "../../Contexts/requests";
import ModalShow from "../../Components/ModalShow";
import SERVER_URL from "../../Services/Server_URL";
import styles from "./styles";

const Home = () => {
  const { user } = useContext(AuthContext);
  const {
    addDeliveryType,
    openClose,
    checkOpenClose,
    updateStatusOpenClose,
    updateBDsytem,
    isloading,
  } = useContext(RequestContext);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkOpenClose();
  }, []);

  useEffect(() => {
    (async () => {
      // Realizar conexão via socket
      const socket = io(SERVER_URL.URL, {
        transports: ["websocket"],
        jsonp: false,
      });

      socket.emit("join", { user_id: user.id });

      socket.on("Operation", (response) => {
        updateStatusOpenClose(response.open_close);
      });
      socket.on("Update", (response) => {
        updateBDsytem(response.timeStamp);
      });
    })();
  }, []);

  function handleDelivery(id) {
    addDeliveryType(id);
    navigation.navigate("Category");
  }

  return (
    <View style={styles.container}>
      <ModalShow visible={modalVisible} title="Horário de Atendimento">
        <View style={styles.contentAttend}>
          <Text style={styles.textAttend}>Segunda: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Terça: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Quarta: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Quinta: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Sexta: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Sábado: 08:00 às 19:00</Text>
          <Text style={styles.textAttend}>Domingo: 08:00 às 12:00</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.buttonAttend}
          >
            <Text> OK </Text>
          </TouchableOpacity>
        </View>
      </ModalShow>

      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/background.png")}
        style={styles.content}
      >
        <View style={styles.body}>
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.imgLogo}
          />

          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.status}>
              {openClose ? "Aberto" : "Fechado"}
            </Text>
          </TouchableOpacity>

          {isloading ? (
            <ActivityIndicator color="#484848" size={48} />
          ) : (
            <>
              {openClose ? (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelivery(1)}
                  >
                    <Image
                      source={require("../../assets/car.png")}
                      style={styles.iconButton}
                    />
                    <Text style={styles.textButton}>DELIVERY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelivery(2)}
                  >
                    <Image
                      source={require("../../assets/position.png")}
                      style={styles.iconButton}
                    />
                    <Text style={styles.textButton}>RETIRADA</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDelivery(3)}
                >
                  <AntDesign
                    name="calendar"
                    size={24}
                    style={styles.iconButton}
                  />
                  <Text style={styles.textButton}>AGENDAMENTO</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.nameUser}>
                Olá, {user.name.toUpperCase().split(" ")[0]}
              </Text>
            </>
          )}
        </View>
        <Text style={styles.version}>version {configApp.expo.version}</Text>
      </ImageBackground>
    </View>
  );
};

export default Home;
