import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import { colors, formatMoney } from "../../Styles";
import MyOrder from "../../Contexts/myOrder";
import { number } from "yup";

const { width } = Dimensions.get("screen");
//-----------------------------------------------------------------------------
//  Componete do Item do carrinho
//-----------------------------------------------------------------------------
const ItemCar = ({ itemCar }) => {
  const { removeItemCar, changeAmountCart } = useContext(MyOrder);

  // Remove o item do Carrinho de compra
  function handleRemoveItemCar(_item) {
    removeItemCar(_item);
  }

  // Incrementar um valor na quantidade de produto
  async function handleUpItem(_itemCar) {
    const increment = Number(itemCar.valueIncrement);
    const newAmount = Number(_itemCar.amount) + increment;
    const newTotal = await calcTotalProduct(_itemCar, newAmount);

    const productChange = {
      ..._itemCar,
      totalItem: newTotal,
      amount: newAmount,
    };
    changeAmountCart(productChange);
  }

  // Descrementar um valor na quantidade de produto
  async function handleDownItem(_itemCar) {
    const decrement = Number(itemCar.valueIncrement);
    if (_itemCar.amount >= 0) {
      const newAmount = Number(_itemCar.amount) - decrement;
      const newTotal = await calcTotalProduct(_itemCar, newAmount);

      const productChange = {
        ..._itemCar,
        totalItem: newTotal,
        amount: newAmount,
      };
      changeAmountCart(productChange);
    }
  }

  async function calcTotalProduct(_itemCar, amount = 1) {
    const priceNormal = Number(_itemCar.price);
    const pricePromotion = Number(_itemCar.pricePromotion);
    // Somar todos os adicionais escolhidos
    const sumAdditional = await _itemCar.listAdditional.reduce(
      (total, item) => {
        return total + Number(item.price);
      },
      0
    );

    const totalAdditional = amount * sumAdditional;

    const totalProduct =
      amount * (_itemCar.promotion ? pricePromotion : priceNormal);

    return totalProduct + totalAdditional;
  }

  function listAdditional() {
    let stringAdditional = "";
    itemCar.listAdditional.forEach((element, idx) => {
      stringAdditional += " 🔸 " + element.description;
      if (itemCar.listAdditional.length > idx + 1) stringAdditional + " /";
    });

    return stringAdditional;
  }
  //------------------------------------------------------------------------------------
  // Retorno da função renderização
  //------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      {!!itemCar.promotion && (
        <View style={styles.contentPromotion}>
          <Text style={styles.textPromotion}>PROMOÇÃO</Text>
        </View>
      )}
      <View style={styles.product}>
        <Image style={styles.imgProduct} source={{ uri: itemCar.image_url }} />
        <View>
          <Text style={styles.description}>
            {itemCar.name.substring(0, width / 20)}
            {itemCar.name.length >= width / 20 && "..."}
          </Text>
          <Text style={styles.price}>
            {itemCar.promotion
              ? `De ${formatMoney(itemCar.price)}/ ${
                  itemCar.measure
                } por ${formatMoney(itemCar.pricePromotion)}`
              : `${formatMoney(itemCar.price)} / ${itemCar.measure}`}
          </Text>
          <Text style={styles.total}>{formatMoney(itemCar.totalItem)}</Text>
          {itemCar.listAdditional.length > 0 && (
            <>
              {listAdditional() !== "" && (
                <>
                  <Text style={{ fontSize: 12 }}>Adicionais: </Text>
                  <Text style={styles.textAddicional}>{listAdditional()}</Text>
                </>
              )}

              {itemCar.note !== "" && (
                <Text style={styles.textAddicional}>Obs: {itemCar.note}</Text>
              )}
            </>
          )}
        </View>
      </View>

      <View style={styles.groupButton}>
        <TouchableOpacity onPress={() => handleRemoveItemCar(itemCar)}>
          <Feather name="trash-2" size={25} color={colors.regular} />
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={itemCar.amount === 0}
            style={styles.buttonIncDec}
            onPress={() => handleDownItem(itemCar)}
          >
            <AntDesign name="minuscircleo" size={20} color={colors.darker} />
          </TouchableOpacity>

          <Text style={styles.textAmount}>{itemCar.amount}</Text>

          <TouchableOpacity
            style={styles.buttonIncDec}
            onPress={() => handleUpItem(itemCar)}
          >
            <AntDesign name="pluscircleo" size={20} color={colors.darker} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemCar;
