import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import MyOrder from "../../Contexts/myOrder";
import { formatMoney, colors } from "../../Styles";
import Additional from "../Additional";
import imgPromotion from "../../assets/promotion.png";
import ModalSuccessAddCar from "../../Components/ModalSuccessAddCar";
import api from "../../Services/api";

const ModalAddProduct = ({ itemProduct, open, toogle }) => {
  const { addItemCar, openClose } = useContext(MyOrder);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [amount, setAmount] = useState(1);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [dataAdditional, setDataAdditional] = useState([]);
  const [typeAdditional, setTypeAdditional] = useState([]);
  const [listAdditional, setListAdditional] = useState([]);
  const [offsetScrollY, setOffSetScrollY] = useState(0);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        await api
          .get("additional", {
            headers: { additional: itemProduct.additional },
          })
          .then((response) => {
            // Recebendo todos os adicionais
            const dataAdditional = response.data;
            //Checar se o produto existe valor padrão selecinado
            const valueSelectAdditional =
              itemProduct.valueDefautAdditional === null
                ? []
                : itemProduct.valueDefautAdditional.split(",").map(Number);

            // Objeto de valor padrão dos adicionais
            let defaultListAdditional = [];

            valueSelectAdditional.map((item) => {
              const additional = dataAdditional.find(
                (addit) => addit.id === item
              );
              typeof additional !== "undefined" &&
                defaultListAdditional.push(additional);
            });

            // Set - Addicionais que foram definidos
            setListAdditional(defaultListAdditional);

            // Set: lista de todos os adicionais cadastrados
            setDataAdditional(dataAdditional);
            // Set: lista tipos de adicionais valores unicos.
            itemProduct.additional !== "" &&
              setTypeAdditional(listUniqueAddicional(dataAdditional));
          })
          .catch((error) => {
            console.log(error.message);
          });
        setTotal(
          itemProduct.promotion
            ? Number(itemProduct.pricePromotion)
            : Number(itemProduct.price)
        );
      })();
    }
    return () => (amoted = false);
  }, [itemProduct.additional]);

  // Exibir lista unica de Tipos de adicionais
  function listUniqueAddicional(list) {
    const listDistinct = [...new Set(list.map((item) => item.typeAdditional))];
    return listDistinct;
  }
  // Adicionar os item no carrinho
  function addToCar(_product) {
    setModalSuccess(true);
    const product = {
      totalItem: total,
      product_id: _product.id,
      amount: amount,
      name: _product.name,
      image_url: _product.image_url,
      measure: _product.measureUnid,
      valueIncrement: _product.valueIncrement,
      promotion: _product.promotion,
      pricePromotion: _product.pricePromotion,
      price: _product.price,
      note: note,
      listAdditional: listAdditional,
    };
    // Adicionar ao carrinho
    addItemCar(product);
    setAmount(1);
    setListAdditional([]);
  }
  // Incrementar quantidade
  async function handleIncrementAmount() {
    const increment = Number(itemProduct.valueIncrement);
    const newAmount = amount + increment;
    const newTotal = await calcTotalProduct(listAdditional, newAmount);
    setAmount(newAmount);
    setTotal(newTotal);
  }
  // Derementar quantidade
  async function handleDecrementAmount() {
    const decrement = Number(itemProduct.valueIncrement);
    const newAmount = amount - decrement;
    if (newAmount >= 0) {
      const newTotal = await calcTotalProduct(listAdditional, newAmount);
      setAmount(newAmount);
      setTotal(newTotal);
    }
  }
  // Calcular o Total do item incluindo os adicionais
  async function calcTotalProduct(listAdditional = [], amount = 1) {
    const priceNormal = Number(itemProduct.price);
    const pricePromotion = Number(itemProduct.pricePromotion);

    const sumAdditional = await listAdditional.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);

    const totalAdditional = amount * sumAdditional;
    const totalProduct =
      amount * (itemProduct.promotion ? pricePromotion : priceNormal);

    return totalProduct + totalAdditional;
  }
  // Adicionar Addicionais
  async function handleSelectAdditional(listAdditional) {
    const newTotal = await calcTotalProduct(listAdditional, amount);

    setTotal(newTotal);
    setListAdditional(listAdditional);
  }
  // Fechar o modal
  function handleCloseModal() {
    setListAdditional([]);
    setAmount(1);
    toogle(false);
  }
  function handleCloseModalSuccess() {
    setModalSuccess(false);
    toogle(false);
  }

  return (
    <View style={styles.container}>
      {/* MODAL DE ADICIONADO COM SUCESSO */}
      <ModalSuccessAddCar
        open={modalSuccess}
        toogle={handleCloseModalSuccess}
      />
      {/* MODAL DETALHE PRODUTO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* IMAGEM DO PRODUTO */}
            <View
              style={[
                styles.contentImage,
                offsetScrollY > 280 && { height: 130 },
              ]}
            >
              <Image
                source={{ uri: itemProduct.image_url }}
                style={[
                  styles.imageModal,
                  offsetScrollY > 280 && { height: 130 },
                ]}
              />
              {offsetScrollY > 280 && (
                <>
                  <Text style={styles.modalTitleOfficeScrollY}>
                    {itemProduct.name}
                  </Text>
                  <View style={styles.modalPrice}>
                    <Text
                      style={
                        itemProduct.promotion
                          ? [styles.modalTextPrice, { color: colors.white }]
                          : [styles.modalPriceNormal, { color: colors.darker }]
                      }
                    >
                      {itemProduct.promotion
                        ? `De R$ ${itemProduct.price} por`
                        : formatMoney(total)}
                    </Text>
                    {itemProduct.promotion && (
                      <Text style={styles.modalTextPricePromotion}>
                        {formatMoney(total)}
                      </Text>
                    )}
                  </View>
                </>
              )}
              <LinearGradient
                colors={["transparent", "#f9f9f9"]}
                style={styles.headerImage}
              />
              <TouchableOpacity style={styles.close}>
                <AntDesign
                  name="closecircle"
                  size={32}
                  color={colors.lighter}
                  onPress={handleCloseModal}
                />
              </TouchableOpacity>
              {itemProduct.promotion && (
                <Image
                  style={[
                    styles.imgProductPromotion,
                    offsetScrollY > 280 && { width: 120, height: 80, top: 32 },
                  ]}
                  source={imgPromotion}
                />
              )}
            </View>
            {/* DESCRIÇÃO DO PRODUTO */}
            <ScrollView
              scrollEventThrottle={2}
              showsVerticalScrollIndicator={false}
              onScroll={(e) => {
                setOffSetScrollY(e.nativeEvent.contentOffset.y);
              }}
            >
              {/* NOME PRODUTO E INGREDIENTE */}
              <View style={styles.modalDescription}>
                <Text style={styles.modalTitleDescription}>
                  {itemProduct.name}
                </Text>
                <Text style={styles.modalTextDescription}>
                  {itemProduct.ingredient}
                </Text>
              </View>
              {/* QUANTIDDE E PREÇO DO PRODUTO */}
              <View style={styles.modalContentAmount}>
                {/* COMANDO DE ADD E SUB */}
                <View style={styles.modalControlAmount}>
                  <TouchableOpacity
                    disabled={amount >= 0 ? false : true}
                    onPress={handleDecrementAmount}
                    style={styles.modalBtnSub}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalAmount}>{amount}</Text>
                  <TouchableOpacity
                    onPress={handleIncrementAmount}
                    style={styles.modalBtnAdd}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>+</Text>
                  </TouchableOpacity>
                </View>
                {/* PRECO DO PRODUTO  */}
                <View>
                  <Text
                    style={
                      itemProduct.promotion
                        ? styles.modalTextPrice
                        : styles.modalPriceNormal
                    }
                  >
                    {itemProduct.promotion
                      ? `De R$ ${itemProduct.price} por`
                      : `${formatMoney(total)}`}
                  </Text>
                  {itemProduct.promotion && (
                    <Text style={styles.modalTextPricePromotion}>
                      {formatMoney(total)}
                    </Text>
                  )}
                </View>
              </View>
              {!openClose && (
                <Text style={styles.titleClose}>Loja Fechada</Text>
              )}
              {/* ADICIONAIS */}
              {Boolean(itemProduct.additional) &&
                typeAdditional.map((titleTypeAddit, idx) => {
                  // Filtrar os adicionais pelas categorias dos tipos
                  const additional = dataAdditional.filter((addit) => {
                    return addit.typeAdditional === titleTypeAddit;
                  });

                  return (
                    // Criar item Adicional agrupado pelo tipo
                    <Additional
                      key={idx}
                      title={titleTypeAddit}
                      additional={additional}
                      open={idx === 0 ? true : false}
                      onValues={listAdditional}
                      onChange={(item) => handleSelectAdditional(item)}
                    />
                  );
                })}

              {/* OBSERVAÇÕES */}
              <View>
                <TextInput
                  style={styles.input}
                  selectTextOnFocus={true}
                  multiline={true}
                  numberOfLines={4}
                  value={note}
                  onChangeText={setNote}
                  placeholder={"Observações"}
                  keyboardType="default"
                />
              </View>
              {/* BOTÃO ADICIOANR O ITEM NO CARRINHO */}
              <View style={styles.modalContentButton}>
                <TouchableOpacity
                  disabled={!openClose || amount === 0}
                  activeOpacity={0.2}
                  onPress={() => addToCar(itemProduct)}
                  style={
                    openClose || amount === 0
                      ? styles.buttonComprar
                      : styles.buttonComprarDisabled
                  }
                >
                  <MaterialIcons
                    name="add-shopping-cart"
                    size={24}
                    color={colors.white}
                  />
                  <Text style={styles.titleButtonComprar}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddProduct;
