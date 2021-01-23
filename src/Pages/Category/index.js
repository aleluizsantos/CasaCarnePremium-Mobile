import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";

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

  useEffect(() => {
    (async () => {
      await api.get("/category").then((response) => {
        setDataCategory(response.data);
      });
    })();
    // async function loadCategory() {
    //   await api.get('/category').then((response)=> {
    //     setDataCategory(response.data);
    //   }).catch(function(error){
    //     if(error.response) {
    //       signOut();
    //     }else if( error.request) {
    //      console.log(error.request);
    //     }else{
    //      console.log('Error', error.message);
    //     }
    //    });
    // }
    // loadCategory();
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
