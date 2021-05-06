import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { colors, formatMoney, formatDataTime } from "../../Styles";

const MyOrdes = ({ request }) => {
  const navigation = useNavigation();

  function handleGoToDetailsMyOrder() {
    navigation.navigate("MyOrderDetails", {
      request: request,
    });
  }
  return (
    <View style={styles.container}>
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

        <Text style={styles.timeDelivery}>{request.timedelivery}</Text>
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
