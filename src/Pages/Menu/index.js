import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  ImageBackground,
} from "react-native";

import Header from "../../Components/Header";
import Promotion from "../../Components/Promotion";
import ItemProduct from "../../Components/ItemProduct";
import api from "../../Services/api";
import MyOrderContext from "../../Contexts/myOrder";

import styles from "./styles";
import icoEmpty from "../../assets/cartsEmpty.png";
import { colors } from "../../Styles";

const Menu = () => {
  const { changeDB } = useContext(MyOrderContext);
  const route = useRoute();
  const { category } = route.params;

  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        loadindProduct();
      })();

      return () => (amoted = false);
    }
  }, []);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        loadindProduct();
      })();
    }
    return () => (amoted = false);
  }, [changeDB]);

  async function loadindProduct() {
    const catId = category.id;
    await api
      .get("product", {
        params: {
          category_id: catId,
        },
      })
      .then((resp) => {
        setDataProduct(resp.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        Alert.alert(
          "Erro no Servidor",
          "Ocorreu um erro inesperado, tente novamente.",
          [{ text: "OK" }]
        );
      });
  }

  return (
    <ImageBackground
      source={require("../../assets/2background.png")}
      resizeMode={"cover"}
      imageStyle={{
        height: "100%",
        top: 0,
        opacity: 0.2,
      }}
      style={styles.container}
    >
      <Header goBack={true} />
      <Promotion />
      <View style={styles.TitleContent}>
        <Text style={styles.title}>Cardápio</Text>
        <Text style={styles.breadcrumb}>{category.name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.productContent}>
          {isLoading ? (
            <ActivityIndicator size={48} color={colors.primary} />
          ) : dataProduct.length <= 0 ? (
            <View>
              <Image style={styles.icoEmpty} source={icoEmpty} />
              <Text style={styles.textIcon}>
                Categoria sem produtos, em breve teremos novidade.
              </Text>
            </View>
          ) : (
            dataProduct.map((item) => (
              <ItemProduct key={item.id} itemProduct={item} />
            ))
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Menu;
