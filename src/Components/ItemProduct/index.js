import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import { formatMoney, colors } from "../../Styles";
import ModalAddProduct from "../../Components/ModalAddProduct";

const ItemProduct = ({ itemProduct }) => {
  const [openModalProduct, setOpenModalProduct] = useState(false);

  // Abrir modal para informar a quantidade do produto
  async function handleInformedModal() {
    setOpenModalProduct(true);
  }

  return (
    <View style={styles.container}>
      {itemProduct.promotion && <Text style={styles.textUnit}>PROMOÇÃO</Text>}
      {/* Buttom para selecionar Item do produto */}
      <BorderlessButton onPress={handleInformedModal}>
        <View style={styles.imgContent}>
          <Image
            style={styles.imgProduct}
            source={{ uri: itemProduct.image_url }}
          />
        </View>
        <View style={styles.description}>
          <Text style={styles.titleDescription}>
            {itemProduct.name.substring(0, 28)}
          </Text>
        </View>

        <View style={styles.priceContent}>
          <Text
            style={
              itemProduct.promotion
                ? styles.textValuePromotion
                : styles.textPrice
            }
          >
            {itemProduct.promotion
              ? formatMoney(itemProduct.pricePromotion)
              : formatMoney(itemProduct.price)}
          </Text>
          <MaterialIcons
            name="add-shopping-cart"
            size={28}
            color={colors.primary}
          />
        </View>
      </BorderlessButton>

      {/* MODAL DETALHE PRODUTO */}
      {openModalProduct && (
        <ModalAddProduct
          itemProduct={itemProduct}
          open={openModalProduct}
          toogle={setOpenModalProduct}
        />
      )}
    </View>
  );
};

export default ItemProduct;
