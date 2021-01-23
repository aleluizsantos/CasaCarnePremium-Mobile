
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import Requests from '../../Contexts/requests';
import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import ItemCar from "../../Components/ItemCar";
import { colors, formatMoney } from "../../Styles";
import imgCartsEmpty from '../../assets/cartsEmpty.png';
import styles from "./styles";
//--------------------------------------------------------------------------------
// PAGE - Carrinho 
//--------------------------------------------------------------------------------
function Car() {
  const  { itemCar, totalCar } = useContext(Requests);
  const [isDetailsTotal, setIsDetailsTotal] = useState(false);

  const navigation = useNavigation();
  // Exibir o detalhe da lista do carrinho do  total a pagar
  function handleToogleTotal() {
    setIsDetailsTotal(!isDetailsTotal);
  }

  // Navegar para tela pagamento para finalizar o pedido
  function handleGotoPayments() {
    navigation.navigate("Payments");
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
        {itemCar.map(items => (
          <ItemCar key={items.name} itemCar={items} />
        ))}
      </ScrollView>
        
        {itemCar.length <= 0 ?
          <View style={styles.containtImage}>
            <Image source={imgCartsEmpty} style={styles.imgCartEmpty} />
            <Text style={styles.textNotItemCart}>Você não tem nenhum item no carrinho!</Text>
          </View>
        :
          <View style={styles.totalContent}>
          <View style={styles.fieldGroup}>
            <Text style={styles.taxaDelivery}>Taxa de entrega</Text>
            <Text style={styles.taxaDelivery}>R$ 0,00</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.total}>{formatMoney(totalCar)}</Text>
          </View>
          <BorderlessButton
            onPress={handleGotoPayments}
            style={styles.buttonConfirm}
            rippleColor={colors.primary}
          >
            <Text style={styles.textButtonConfirm}>Confirmar Pedido</Text>
          </BorderlessButton>
        </View>
        }
    </View>
  );
}

export default Car;
