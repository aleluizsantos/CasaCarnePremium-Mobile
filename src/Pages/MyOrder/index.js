import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import MyOrdes from "../../Components/MyOrdes";
import SubHeader from "../../Components/SubHeader";
import requests from "../../Contexts/requests";
import api from "../../Services/api";
import styles from "./styles";

const MyOrder = () => {
  const navigation = useNavigation();
  const { updateDB } = useContext(requests);
  const [dataRequest, setDataRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleMoreOrder, setVisibleMoreOrder] = useState(true);
  const [message, setMessage] = useState("Visualizar Pedidos finalizados");
  const [bottonMoreOrders, setBottonMoreOrders] = useState(false);

  useEffect(() => {
    (async () => {
      navigation.addListener("focus", () => setIsLoading(!isLoading));
      await api
        .get("request", { headers: { statusRequest: "1,2,3,4,5" } })
        .then((response) => {
          setDataRequest(response.data);
        });
      setVisibleMoreOrder(true);
    })();
  }, [updateDB, isLoading, navigator]);

  const handleIsLoadMoreOrders = async () => {
    await api
      .get("request", { headers: { statusRequest: "6" } })
      .then((response) => {
        const { data } = response;
        setDataRequest([...dataRequest, ...data]);
        if (data.length <= 0) {
          setBottonMoreOrders(true);
          setMessage(
            "Você não tem nenhum compra finalizada. Que tal iniciar uma compra, temos excelente ofertas."
          );
        } else {
          setVisibleMoreOrder(false);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader
        title="Meus pedidos"
        subTitle="Relação de pedidos realizados"
      />
      <View style={styles.body}>
        <ScrollView>
          {dataRequest.map((item) => (
            <MyOrdes key={item.id} request={item} />
          ))}
          {visibleMoreOrder && (
            <TouchableOpacity
              onPress={handleIsLoadMoreOrders}
              disabled={bottonMoreOrders}
              style={{ alignContent: "center", justifyContent: "center" }}
            >
              <Text style={styles.textLoadMore}>{message}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyOrder;
