import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";

import api from "../../Services/api";
import ItemPromotion from "../ItemPromotion";
import requests from "../../Contexts/requests";

import styles from "./styles";

const Promotion = () => {
  const { updateDB } = useContext(requests);
  const [dataProductPromotion, setDataProductPromotion] = useState([]);

  useEffect(() => {
    (async () => {
      await api.get("/product/promotion").then((response) => {
        setDataProductPromotion(response.data);
      });
    })();
  }, [updateDB]);

  return dataProductPromotion.length <= 0 ? (
    <View />
  ) : (
    <View style={styles.promotionContent}>
      <ScrollView horizontal={true}>
        {dataProductPromotion.map((product) => (
          <ItemPromotion key={product.id} productPromotion={product} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Promotion;
