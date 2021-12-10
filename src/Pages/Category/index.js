import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import MyOrderContext from "../../Contexts/myOrder";
import AuthContext from "../../Contexts/auth";
import Header from "../../Components/Header";
import ItemCategory from "../../Components/ItemCategory";
import Promotion from "../../Components/Promotion";
import SubHeader from "../../Components/SubHeader";
import api from "../../Services/api";
import serverURL from "../../Services/serverURL";
import { colors } from "../../Styles";
import styles from "./styles";

const Category = () => {
  const { setOpenClose, setChangeDB, changeDB } = useContext(MyOrderContext);
  const { user } = useContext(AuthContext);
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        loadingCategory();
        // Realizar conexão via socket
        const socket = io(serverURL.URL, {
          transports: ["websocket"],
          jsonp: false,
        });

        user !== null && socket.emit("join", { user_id: user.id });

        socket.on("operation", (response) => {
          setOpenClose(response.open_close);
        });
        socket.on("Update", (response) => {
          setChangeDB(response);
        });
      })();
    }
    return () => (amoted = false);
  }, []);

  useEffect(() => {
    let amoted = true;
    amoted && loadingCategory();
    return () => (amoted = false);
  }, [changeDB]);

  async function loadingCategory() {
    await api.get("/category").then((response) => {
      setDataCategory(response.data);
      setIsLoading(false);
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
      <Header />
      <SubHeader
        title="Oferta em Destaque"
        subTitle="Produtos que são perfeitos para você!"
      />
      <Promotion />

      <Text style={styles.titleCategory}>Selecione a categoria</Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.categoryContent}>
          {dataCategory.map((category) => (
            <ItemCategory key={category.id} category={category} />
          ))}
        </View>
        {isLoading && <ActivityIndicator color={colors.primary} size={48} />}
      </ScrollView>
    </ImageBackground>
  );
};

export default Category;
