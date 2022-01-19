import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";

import MyOrder from "../../Contexts/myOrder";
import Auth from "../../Contexts/auth";
import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import ItemCar from "../../Components/ItemCar";
import ModalNotice from "../../Components/ModalNotice";
import { colors, formatMoney } from "../../Styles";
import imgCartsEmpty from "../../assets/cartsEmpty.png";
import imgDelivery from "../../assets/delivery.png";
import imgHome from "../../assets/home.png";
import styles from "./styles";
//--------------------------------------------------------------------------------
// PAGE - Carrinho
//--------------------------------------------------------------------------------
function Car() {
  const {
    itemCar,
    totalCar,
    taxaDelivery,
    typeDelivery,
    selectedTypeDelivery,
    setSelectedTypeDelivery,
  } = useContext(MyOrder);
  const { user } = useContext(Auth);
  const navigation = useNavigation();
  const [toogleModal, setToogleModal] = useState(true);
  const [taxa, setTaxa] = useState(0);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (() => {
        selectedTypeDelivery?.id && selectedTypeDelivery?.id !== 2
          ? totalCar >= taxaDelivery.vMinTaxa && taxaDelivery.vMinTaxa > 0
            ? setTaxa(0)
            : setTaxa(Number(taxaDelivery.taxa))
          : setTaxa(0);
      })();
    }
    return () => (amoted = false);
  }, [selectedTypeDelivery, totalCar]);

  // Navegar para tela pagamento para finalizar o pedido
  function handleGotoPayments() {
    if (user === null) {
      Alert.alert(
        "Falta pouco!",
        "Para finalizar o pedido é necessário fornecer algumas informações.",
        [
          {
            text: "Cancelar",
            style: "destructive",
          },
          {
            text: "Informa dados",
            onPress: () => navigation.navigate("Onboarding"),
          },
        ]
      );
    } else {
      navigation.navigate("Payments");
    }
  }

  function handleSelectedTypeDelivery(selectedTypeDelivery) {
    setSelectedTypeDelivery(selectedTypeDelivery);
    setToogleModal(false);
  }

  return (
    <View style={styles.container}>
      <Header goBack={true} />
      <SubHeader title="Meu Carrinho" subTitle="Produtos selecionados" />

      {itemCar.length === 0 ? (
        <View style={styles.containtImage}>
          <Image source={imgCartsEmpty} style={styles.imgCartEmpty} />
          <Text style={styles.textNotItemCart}>Opss!! Carrinho Vazio.</Text>
        </View>
      ) : (
        <ScrollView>
          {itemCar.map((items, idx) => (
            <ItemCar key={idx} itemCar={items} />
          ))}
        </ScrollView>
      )}

      {itemCar.length > 0 && (
        <View style={styles.totalContent}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Tipo de entrega",
                "Você poderá alterar o tipo de entrega, após confirmar o pedido.",
                [{ text: "OK" }]
              )
            }
            style={styles.fieldGroup}
          >
            <Text style={styles.taxaDelivery}>Tipo entrega</Text>
            <Text style={styles.taxaDelivery}>
              {selectedTypeDelivery?.description || ""}
            </Text>
          </TouchableOpacity>

          <View style={styles.fieldGroup}>
            <Text style={styles.taxaDelivery}>Taxa de entrega</Text>
            <Text style={styles.taxaDelivery}>{formatMoney(taxa)}</Text>
          </View>

          {parseFloat(totalCar) < taxaDelivery.vMinTaxa && (
            <View style={[styles.fieldGroup, { justifyContent: "flex-end" }]}>
              <Text style={{ color: colors.red }}>
                acima de R$ {taxaDelivery.vMinTaxa} entrega GRATIS
              </Text>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.total}>{formatMoney(totalCar)}</Text>
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

      {selectedTypeDelivery === null && itemCar.length > 0 && (
        <ModalNotice show={toogleModal}>
          <Text style={styles.titleModal}>Como será sua entrega!</Text>
          <View style={styles.footerButtom}>
            <TouchableOpacity
              onPress={() => handleSelectedTypeDelivery(typeDelivery[0])}
              style={styles.button}
            >
              <Image
                resizeMode="contain"
                source={imgDelivery}
                style={{ width: 40, height: 40, marginRight: 15 }}
              />
              <Text style={styles.textButton}>
                {typeDelivery[0].description}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectedTypeDelivery(typeDelivery[1])}
              style={styles.buttonOutline}
            >
              <Image
                resizeMode="contain"
                source={imgHome}
                style={{ width: 28, height: 28, marginRight: 15 }}
              />
              <Text style={styles.textButton}>
                {typeDelivery[1].description}
              </Text>
            </TouchableOpacity>
          </View>
        </ModalNotice>
      )}
    </View>
  );
}

export default Car;
