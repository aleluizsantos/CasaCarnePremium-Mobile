import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import Requests from "../../Contexts/requests";

import styles from "./styles";
import { formatMoney, colors } from "../../Styles";

const ItemProduct = ({ itemProduct }) => {
  const { addItemCar, itemCar, updateAmountCart } = useContext(Requests);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);

  // Verificar se o produto já eta no carrinho
  const isBuy = itemCar.find((item) => item.name === itemProduct.name);
  //se estive no carrinho set a quantidade comprada

  // Abrir modal para informar a quantidade do produto
  function handleInformedModal() {
    !!isBuy && setAmount(isBuy.amount);
    setModalVisible(true);
  }
  // Fechar o modal
  function handleCancelModal() {
    setModalVisible(false);
  }
  // Adicionar os item no carrinho
  function AddToCar(_product) {
    if (!!!isBuy) {
      // Verificar se o item já esta no carrinho
      addItemCar({
        amount: amount,
        product_id: _product.id,
        name: _product.name,
        image_url: _product.image_url,
        measure: _product.measureUnid,
        promotion: _product.promotion,
        pricePromotion: _product.pricePromotion,
        price: _product.price,
      });
      // Fechar o modal
      setModalVisible(false);
      setAmount(1);
    } else {
      // Atualizar a lista do carrinho passando o produto, a quantidade antiga
      // e a nova quantidade
      updateAmountCart(_product, isBuy.amount, amount);
      setModalVisible(false);
      setAmount(1);
    }
  }
  return (
    <View style={[styles.container, isBuy && styles.buy]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setAmount("");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textInformedAmount}>Quantidade desejada!</Text>
            <Text style={styles.textModalProduct}>{itemProduct.name}</Text>
            <View style={styles.groupText}>
              <Text>{formatMoney(itemProduct.price)}</Text>
              {!!itemProduct.promotion && (
                <Text style={styles.textValuePromotion}>
                  {" "}
                  por {formatMoney(itemProduct.pricePromotion)}
                </Text>
              )}
            </View>

            <View style={styles.groupAmount}>
              <TouchableOpacity
                onPress={() =>
                  setAmount(
                    amount === 0
                      ? 0
                      : amount - (itemProduct.measureUnid === "KG" ? 0.5 : 1)
                  )
                }
              >
                <AntDesign name="minussquare" size={48} color={colors.darker} />
              </TouchableOpacity>

              <Text style={styles.textAmout}>{amount}</Text>

              <TouchableOpacity
                onPress={() =>
                  setAmount(
                    amount + (itemProduct.measureUnid === "KG" ? 0.5 : 1)
                  )
                }
              >
                <AntDesign name="plussquare" size={48} color={colors.darker} />
              </TouchableOpacity>
            </View>
            {!!isBuy ? (
              <Text style={styles.textAlertProductCarts}>
                Você já comprou este produto, deseja aumentar a quantidade?
              </Text>
            ) : (
              <Text style={styles.textAlert}>
                Sr(a) cliente! durante a pesagem do produto pode ocorrer uma
                pequena variação no peso, para mais ou para menos.
              </Text>
            )}

            <View style={styles.containerButtonAdd}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={handleCancelModal}
              >
                <Text style={styles.titleButtonCancel}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonComprar}
                onPress={() => AddToCar(itemProduct)}
              >
                <Text style={styles.titleButtonComprar}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
          <MaterialIcons name="add-shopping-cart" size={28} color="black" />
        </View>
      </BorderlessButton>

      {itemProduct.promotion ? (
        <Text style={styles.textUnit}>PROMOÇÃO</Text>
      ) : (
        <Text style={styles.textUnit}>1 {itemProduct.measureUnid} </Text>
      )}
    </View>
  );
};

export default ItemProduct;
