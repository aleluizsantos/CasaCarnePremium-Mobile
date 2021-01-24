import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";

import api from "../../Services/api";
import Requests from "../../Contexts/requests";
import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import ItemCar from "../../Components/ItemCar";
import { colors, formatMoney } from "../../Styles";
import imgCartsEmpty from "../../assets/cartsEmpty.png";
import styles from "./styles";
//--------------------------------------------------------------------------------
// PAGE - Carrinho
//--------------------------------------------------------------------------------
function Car() {
  const { itemCar, totalCar } = useContext(Requests);
  const [isloading, setIsLoading] = useState(true);
  const [taxaDelivery, setTaxaDelivery] = useState({ vMinTaxa: 0, taxa: 0 });
  const [vtaxaDelivery, setVtaxaDelivery] = useState(0);

  useEffect(() => {
    (async () => {
      await api.get("/taxa").then((response) => {
        setTaxaDelivery(response.data);
        setIsLoading(false);
      });
    })();
  }, []);

  useEffect(() => {
    const tx =
      parseFloat(totalCar) >= taxaDelivery.vMinTaxa ? 0 : taxaDelivery.taxa;
    setVtaxaDelivery(tx);
  }, [isloading, totalCar]);

  const navigation = useNavigation();

  // Navegar para tela pagamento para finalizar o pedido
  function handleGotoPayments() {
    navigation.navigate("Payments", {
      vTaxaDelivery: vtaxaDelivery,
    });
  }

  if (isloading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#484848" size={48} />
      </View>
    );
  }

  //--------------------------------------------------------------------------------
  // Retorno da função Renderização do Carrinho
  //--------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Header goBack={true} />
      <SubHeader title="Meu Carrinho" subTitle="Produtos selecionados" />
      {/* Itens do pedido */}
      <ScrollView>
        {itemCar.map((items) => (
          <ItemCar key={items.name} itemCar={items} />
        ))}
      </ScrollView>

      {itemCar.length <= 0 ? (
        <View style={styles.containtImage}>
          <Image source={imgCartsEmpty} style={styles.imgCartEmpty} />
          <Text style={styles.textNotItemCart}>
            Você não tem nenhum item no carrinho!
          </Text>
        </View>
      ) : (
        <View style={styles.totalContent}>
          <View style={styles.fieldGroup}>
            <Text style={styles.taxaDelivery}>Taxa de entrega</Text>
            <Text style={styles.taxaDelivery}>
              {formatMoney(vtaxaDelivery)}
            </Text>
          </View>

          {parseFloat(totalCar) < taxaDelivery.vMinTaxa && (
            <View style={[styles.fieldGroup, { justifyContent: "flex-end" }]}>
              <Text style={{ color: colors.red }}>
                acima de R$ 50,00 entrega GRATIS
              </Text>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.total}>
              {formatMoney(parseFloat(totalCar) + parseFloat(vtaxaDelivery))}
            </Text>
          </View>
          <BorderlessButton
            enabled={!!totalCar ? true : false}
            onPress={handleGotoPayments}
            style={[
              styles.buttonConfirm,
              !!!totalCar && { opacity: 0.2, backgroundColor: "#d3d3d3" },
            ]}
            rippleColor={colors.primary}
          >
            <Text style={styles.textButtonConfirm}>Confirmar Pedido</Text>
          </BorderlessButton>
        </View>
      )}
    </View>
  );
}

export default Car;
