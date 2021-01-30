import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";

import Header from "../../Components/Header";
import ItemCategory from "../../Components/ItemCategory";
import Promotion from "../../Components/Promotion";
import SubHeader from "../../Components/SubHeader";
import requests from "../../Contexts/requests";
import auth from "../../Contexts/auth";
import api from "../../Services/api";
import styles from "./styles";

const Category = () => {
  const { updateDB } = useContext(requests);
  const { signOut } = useContext(auth);
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await api.get("/category").then((response) => {
        setDataCategory(response.data);
        setIsLoading(false);
      });
    })();
  }, [updateDB]);

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader
        title="Oferta em Destaque"
        subTitle="Produtos que são perfeitos para você!"
      />
      <Promotion />

      <Text style={styles.titleCategory}>Selecione a categoria</Text>

      {isLoading && <ActivityIndicator color="#484848" size={24} />}

      <ScrollView>
        <View style={styles.categoryContent}>
          {dataCategory.map((category) => (
            <ItemCategory key={category.id} category={category} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Category;
