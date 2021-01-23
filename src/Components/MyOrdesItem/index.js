import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { formatMoney } from "../../Styles";

const MyOrdesItem = ({items}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Text style={styles.titleProduct}>{items.name}</Text>
        <Text style={styles.amountProduct}>Quant. {items.amount} {items.measureUnid}</Text>
      </View>
      <View style={styles.priceProduct}>
        <Text style={styles.totalProduct}>{formatMoney(items.price * items.amount)}</Text>
      </View>
    </View>
  );
};

export default MyOrdesItem;
