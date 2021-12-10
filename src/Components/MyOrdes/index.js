import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { colors, formatMoney, formatDataTime } from "../../Styles";

const typeDelivery = {
  EM_ANALISE: 1,
  EM_PREPARACAO: 2,
  ROTA_ENTREGA: 3,
  RETIRAR_LOJA: 4,
  FINALIZADO: 6,
};

const MyOrdes = ({ request }) => {
  const navigation = useNavigation();

  function handleGoToDetailsMyOrder() {
    navigation.navigate("MyOrderDetails", {
      request: request,
    });
  }
  return (
    // <View style={styles.container}>
    <View
      style={[
        styles.container,
        { borderColor: request.BGcolor },
        request.statusRequest_id === typeDelivery.FINALIZADO &&
          styles.containerOpacity,
      ]}
    >
      <View style={styles.fieldGroup}>
        <Text style={styles.textNumberOrder}>#{request.id}</Text>
        <View style={styles.fieldGroup}>
          <Feather name="clock" size={14} color={colors.darker} />
          <Text style={styles.textDateTime}>
            {formatDataTime(request.dateTimeOrder)}
          </Text>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.total}>{formatMoney(request.totalPurchase)}</Text>
        {request.statusRequest_id !== typeDelivery.FINALIZADO ? (
          <Text style={styles.timeDelivery}>{request.timeDelivery}</Text>
        ) : (
          <Text style={styles.timeDelivery}>Produto entregue</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <TouchableOpacity onPress={() => handleGoToDetailsMyOrder(request)}>
          <Text style={styles.details}>Detalhes</Text>
        </TouchableOpacity>
        <Text style={[styles.status, { backgroundColor: request.BGcolor }]}>
          {request.statusRequest}
        </Text>
      </View>
    </View>
  );
};

export default MyOrdes;
