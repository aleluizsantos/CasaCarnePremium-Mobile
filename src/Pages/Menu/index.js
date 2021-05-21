import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../Components/Header";
import Promotion from "../../Components/Promotion";
import ItemProduct from "../../Components/ItemProduct";
import api from "../../Services/api";
import requests from "../../Contexts/requests";
import auth from "../../Contexts/auth";

import styles from "./styles";
import icoEmpty from "../../assets/empty.png";
import { colors } from "../../Styles";

const Menu = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateDB } = useContext(requests);
  const { signOut } = useContext(auth);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = route.params;

  useEffect(() => {
    (async () => {
      const catId = category.id;
      try {
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
              "Token expirou",
              "Para continuar utilizando o aplicativo é necessário fazer novamento seu login.",
              [
                {
                  text: "OK",
                  onPress: () => signOut(),
                  style: "default",
                },
              ]
            );
          });
      } catch (error) {
        signOut();
      }
    })();
  }, [updateDB]);

  return (
    <View style={styles.container}>
      <Header goBack={true} />
      <Promotion />
      <View style={styles.TitleContent}>
        <Text style={styles.title}>Cadápio</Text>
        <Text style={styles.breadcrumb}>{category.name}</Text>
      </View>

      <ScrollView>
        <View style={styles.productContent}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.darker} />
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
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("App", { screen: "Home" })}
          style={styles.buttonCategory}
        >
          <AntDesign name="home" size={28} color="#c1bccc" />
          <Text style={styles.labelFooter}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonCategory}
        >
          <AntDesign name="isv" size={30} color="#32264d" />
          <Text style={styles.labelFooterActive}>Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("App", { screen: "Search" })}
          style={styles.buttonCategory}
        >
          <AntDesign
            style={{ top: -2 }}
            name="search1"
            size={28}
            color="#c1bccc"
          />
          <Text style={styles.labelFooter}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("App", { screen: "MyOrder" })}
          style={styles.buttonCategory}
        >
          <AntDesign name="tagso" size={28} color="#c1bccc" />
          <Text style={styles.labelFooter}>Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("App", { screen: "Config" })}
          style={styles.buttonCategory}
        >
          <AntDesign name="setting" size={28} color="#c1bccc" />
          <Text style={styles.labelFooter}>Categoria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;
