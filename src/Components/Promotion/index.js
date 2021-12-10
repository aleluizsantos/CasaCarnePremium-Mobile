import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView, Alert, ImageBackground } from "react-native";

import api from "../../Services/api";
import ItemPromotion from "../ItemPromotion";
import MyOrderContext from "../../Contexts/myOrder";
import AuthContext from "../../Contexts/auth";

import styles from "./styles";

const Promotion = () => {
  const [dataProductPromotion, setDataProductPromotion] = useState([]);
  const { changeDB } = useContext(MyOrderContext);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        await api
          .get("/product/promotion")
          .then((response) => {
            setDataProductPromotion(response.data);
          })
          .catch((err) => {
            signOut();
            Alert.alert("Opss!!!", "Falha na comunicação.", [{ text: "OK" }]);
          });
      })();
    }
    return () => (amoted = false);
  }, [changeDB]);

  return dataProductPromotion.length <= 0 ? (
    <View />
  ) : (
    <ImageBackground
      source={require("../../assets/imgHeader.png")}
      resizeMode={"cover"}
      imageStyle={{
        width: "100%",
        transform: [{ scaleX: 1.5 }],
      }}
      style={styles.promotionContent}
    >
      <ScrollView horizontal={true}>
        {dataProductPromotion.map((product) => (
          <ItemPromotion key={product.id} productPromotion={product} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default Promotion;
