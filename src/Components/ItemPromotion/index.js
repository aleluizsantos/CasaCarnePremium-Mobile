import React, { useState } from "react";

import { View, Image, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";
import { formatMoney } from "../../Styles";
import ModalAddProduct from "../ModalAddProduct";

const ItemPromotion = ({ productPromotion }) => {
  const [openModalProduct, setOpenModalProduct] = useState(false);

  // Abrir modal para informar a quantidade do produto
  async function handleInformedModal() {
    setOpenModalProduct(true);
  }

  return (
    <View>
      <RectButton onPress={handleInformedModal}>
        <View style={styles.itemPromotion}>
          <Image
            style={styles.imgItempromotion}
            source={{
              uri: productPromotion.image_url,
            }}
          />
          <Text style={styles.titleItemPromotion}>
            {productPromotion.name.substring(0, 10)}
          </Text>
          <Text style={styles.priceItemPromotion}>
            {formatMoney(productPromotion.pricePromotion)}
          </Text>
        </View>
      </RectButton>
      {/* MODAL DETALHE PRODUTO */}
      {openModalProduct && (
        <ModalAddProduct
          itemProduct={productPromotion}
          open={openModalProduct}
          toogle={setOpenModalProduct}
        />
      )}
    </View>
  );
};

export default ItemPromotion;
