import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import MyOrdes from "../../Components/MyOrdes";
import SubHeader from "../../Components/SubHeader";
import myOrderContext from "../../Contexts/myOrder";
import authContext from "../../Contexts/auth";
import api from "../../Services/api";
import styles from "./styles";
import imgCartsEmpty from "../../assets/cartsEmpty.png";
import { colors } from "../../Styles";

const MyOrder = () => {
  const navigation = useNavigation();
  const { changeDB } = useContext(myOrderContext);
  const { user } = useContext(authContext);
  const [dataRequest, setDataRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  navigation.addListener("focus", () => setIsLoading(true));

  useEffect(() => {
    let amoted = true;
    if (amoted && Boolean(user)) {
      loadingRequest();
    } else {
      setIsLoading(false);
    }
    return () => (amoted = false);
  }, [isLoading, navigator]);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      if (typeof changeDB.userId !== "undefined") {
        changeDB.userId === user.id && loadingRequest();
      }
    }
    return () => (amoted = false);
  }, [changeDB]);

  const loadingRequest = async () => {
    await api
      .get("request", { headers: { statusRequest: "1,2,3,4,5,6" } })
      .then((response) => {
        setDataRequest(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        Alert.alert(
          "Falha na comunicação",
          "Desculpa, tivemos algum tipo de erro na comunicação."
        );
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader
        title="Meus pedidos"
        subTitle="Relação de pedidos realizados"
      />
      {dataRequest.length === 0 ? (
        <View style={styles.emptyMyOrder}>
          <Image source={imgCartsEmpty} style={styles.imgEmptyMyOrder} />
          <Text style={styles.textEmptyMyOrder}>
            Você não tem nenhum pedido realizado.
          </Text>
        </View>
      ) : (
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataRequest.map((item) => (
              <MyOrdes key={item.id} request={item} />
            ))}
            {isLoading && (
              <ActivityIndicator color={colors.primary} size={48} />
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MyOrder;
