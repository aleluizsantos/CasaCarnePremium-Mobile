import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { colors } from "../../Styles";
import serverURL from "../../Services/serverURL";

const ItemCategory = ({ category }) => {
  const navigation = useNavigation();
  const [errLoadingImage, setErrLoadingImage] = useState(false);

  const imageDefault = serverURL.URL + "/uploads/default.jpg";

  // Navegar para Menu
  function handleToMenu(category) {
    navigation.navigate("Menu", {
      category: category,
    });
  }

  return (
    <BorderlessButton
      rippleColor={colors.primary}
      onPress={() => handleToMenu(category)}
    >
      <View style={styles.itemCategory}>
        <View style={styles.imgItemContent}>
          <Image
            onError={() => setErrLoadingImage(true)}
            style={styles.imgItemCategory}
            source={{
              uri: errLoadingImage ? imageDefault : category.image_url,
            }}
          />
        </View>
        <View style={styles.titleItemCategory}>
          <Text style={styles.textTitleItemCategory}>{category.name}</Text>
        </View>
      </View>
    </BorderlessButton>
  );
};

export default ItemCategory;
