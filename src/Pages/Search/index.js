import React, { useState, useEffect, useRef } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  TextInput,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  ImageBackground,
  Keyboard,
} from "react-native";

import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import styles from "./styles";
import { colors, formatMoney } from "../../Styles";
import api from "../../Services/api";
import ModalAddProduct from "../../Components/ModalAddProduct";

const { width } = Dimensions.get("screen");

const Search = () => {
  const refInputSearch = useRef(null);
  const isFocused = useIsFocused();
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [search, setSearch] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [selectedProdut, setSelectedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      if (isFocused) {
        setSearch("");
        refInputSearch.current.focus();
      } else {
        Keyboard.dismiss();
      }
    }
    return () => (amoted = false);
  }, [isFocused]);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        setIsLoading(true);
        if (search.length >= 2) {
          const products = await api.get(`/product/all/${search}`);
          setDataProduct(products.data.products);
          setIsLoading(false);
        }
        if (search.length < 2) {
          setDataProduct([]);
          setIsLoading(false);
        }
      })();
    }
    return () => (amoted = false);
  }, [search]);

  // Abrir modal para informar a quantidade do produto
  function handleInformedModal(_item) {
    setSelectedProduct(_item); //Set o produto selecinado na lista
    setOpenModalProduct(true); //Abrir o modal add produto
  }
  function handleCloseModal() {
    setSelectedProduct({}); //Limpar produto selecinado
    setOpenModalProduct(false); //Fechar o modal
  }
  return (
    <ImageBackground
      source={require("../../assets/2background.png")}
      resizeMode={"cover"}
      imageStyle={{
        height: "85%",
        left: -10,
        top: 110,
        opacity: 0.2,
      }}
      style={styles.container}
    >
      <Header />
      <SubHeader title="Qual produto você deseja?"></SubHeader>
      <View style={styles.contentInput}>
        <TextInput
          ref={refInputSearch}
          style={styles.input}
          placeholder="Localizar produto"
          value={search}
          onChangeText={setSearch}
          autoFocus={true}
        />
      </View>
      <ScrollView>
        {isLoading && <ActivityIndicator color={colors.dark} size={48} />}
        {dataProduct.map((item) => (
          <View key={item.id} style={styles.containerProduct}>
            {item.promotion && (
              <Text style={styles.textPromotion}>PROMOÇÃO</Text>
            )}
            <BorderlessButton onPress={() => handleInformedModal(item)}>
              <View style={styles.product}>
                <Image
                  style={styles.imgProduct}
                  source={{ uri: item.image_url }}
                />
                <View style={styles.textLineBlock}>
                  <View style={styles.block}>
                    <Text style={styles.description}>
                      {item.name.substring(0, width / 15)}
                      {item.name.length >= width / 15 && "..."}
                    </Text>
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
            </BorderlessButton>
          </View>
        ))}
      </ScrollView>
      <View>
        {/* MODAL QUANTIDADE PRODUTO */}
        {openModalProduct && (
          <ModalAddProduct
            itemProduct={selectedProdut}
            open={openModalProduct}
            toogle={handleCloseModal}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Search;
