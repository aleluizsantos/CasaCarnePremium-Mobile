import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import api from "../../Services/api";
import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import styles from "./styles";
import { formatMoney, colors } from "../../Styles";
import Requests from "../../Contexts/requests";

const Search = () => {
  const { addItemCar, itemCar, updateAmountCart } = useContext(Requests);
  const [search, setSearch] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);
  const [product_id, setProduct_id] = useState("");
  const [name, setName] = useState("");
  const [image_url, setImage_url] = useState("");
  const [measure, setMeasure] = useState("");
  const [promotion, setPromotion] = useState("");
  const [pricePromotion, setPricePromotion] = useState("");
  const [price, setPrice] = useState("");
  const [isBuy, SetIsBuy] = useState("");
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (search.length > 2) {
        const products = await api.get(`/product/all/${search}`);
        setDataProduct(products.data.products);
      }
      if (search.length === 0) setDataProduct([]);

      SetIsLoading(false);
    }
    loadProduct();
  }, [search]);

  function AddToCar() {
    const dataProductToAdd = {
      id: product_id,
      amount: amount,
      product_id: product_id,
      name: name,
      image_url: image_url,
      measure: measure,
      promotion: promotion,
      pricePromotion: pricePromotion,
      price: price,
    };

    if (!!!isBuy) {
      // Verificar se o item já esta no carrinho
      addItemCar(dataProductToAdd);
      // Fechar o modal
      setModalVisible(false);
      setSearch("");
      setAmount(1);
    } else {
      // Atualizar a lista do carrinho passando o produto, a quantidade antiga
      // e a nova quantidade
      updateAmountCart(dataProductToAdd, isBuy.amount, amount);
      setModalVisible(false);
      setAmount(1);
    }
  }
  // Abrir modal para informar a quantidade do produto
  async function handleInformedModal(_item) {
    const isBuyresp = await itemCar.find((item) => item.name === _item.name);

    SetIsBuy(isBuyresp);

    setProduct_id(_item.id);
    setName(_item.name);
    setImage_url(_item.image_url);
    setMeasure(_item.measure);
    setPromotion(_item.promotion);
    setPricePromotion(_item.pricePromotion);
    setPrice(_item.price);

    !!isBuyresp ? setAmount(isBuyresp.amount) : setAmount(1);
    setModalVisible(true);
  }
  // Fechar o modal
  function handleCancelModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Header />
      <SubHeader title="Qual produto você deseja?"></SubHeader>
      <View style={styles.contentInput}>
        {isLoading && (
          <ActivityIndicator style={styles.indicator} size="small" />
        )}
        <TextInput
          style={styles.input}
          placeholder="Localizar produto"
          value={search}
          onChangeText={setSearch}
          autoFocus={true}
        />
      </View>
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
            <Text style={styles.textModalProduct}>{name}</Text>
            <View style={styles.groupText}>
              <Text>{formatMoney(price)}</Text>
              {!!promotion && (
                <Text style={styles.textValuePromotion}>
                  {" "}
                  por {formatMoney(pricePromotion)}
                </Text>
              )}
            </View>

            <View style={styles.groupAmount}>
              <TouchableOpacity
                onPress={() => setAmount(amount === 0 ? 0 : amount - 0.5)}
              >
                <AntDesign name="minussquare" size={48} color={colors.darker} />
              </TouchableOpacity>

              <Text style={styles.textAmout}>{amount}</Text>

              <TouchableOpacity onPress={() => setAmount(amount + 0.5)}>
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
              <TouchableOpacity style={styles.buttonComprar} onPress={AddToCar}>
                <Text style={styles.titleButtonComprar}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {dataProduct.map((item) => (
        <View key={item.id} style={styles.containerProduct}>
          {!!item.promotion && (
            <Text style={styles.textPromotion}>PROMOÇÃO</Text>
          )}
          <TouchableOpacity onPress={() => handleInformedModal(item)}>
            <View style={styles.product}>
              <Image
                style={styles.imgProduct}
                source={{ uri: item.image_url }}
              />
              <View style={styles.textLineBlock}>
                <View style={styles.block}>
                  <Text style={styles.description}>{item.name}</Text>
                  <Text style={styles.price}>
                    {item.promotion
                      ? `De ${formatMoney(item.price)}/ ${
                          item.measureUnid
                        } por ${formatMoney(item.pricePromotion)}`
                      : `${formatMoney(item.price)} / ${item.measureUnid}`}
                  </Text>
                </View>
                <Text style={styles.total}>
                  {formatMoney(
                    item.promotion ? item.pricePromotion : item.price
                  )}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Search;
