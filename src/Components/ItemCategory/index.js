import React from "react";
import { View, Image, Text, Alert } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { colors } from "../../Styles";

const ItemCategory = ({ category }) => {
  const navigation = useNavigation();

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
            style={styles.imgItemCategory}
            source={{ uri: category.image_url }}
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
