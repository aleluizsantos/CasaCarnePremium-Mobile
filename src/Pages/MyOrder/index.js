import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Text } from "react-native";
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

  useEffect(() => {
    (async () => {
      navigation.addListener("focus", () => setIsLoading(!isLoading));
      await api
        .get("request", { headers: { statusRequest: "1,2,3,4,5,6" } })
        .then((response) => {
          setDataRequest(response.data);
        });
    })();
  }, [updateDB, isLoading, navigator]);

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
        </ScrollView>
      </View>
    </View>
  );
};

export default MyOrder;
