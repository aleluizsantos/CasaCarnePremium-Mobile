import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { formatMoney } from "../../Styles";

const MyOrdesItem = ({ items }) => {
  const [additional, setAdditional] = useState("");
  const [totalAdditional, setTotalAdditional] = useState(0);

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (() => {
        let stringAdditional = "";
        let valueTotalAdditional = 0;
        items.additional.forEach((element, idx) => {
          stringAdditional += element.description;
          valueTotalAdditional = valueTotalAdditional + Number(element.price);
          if (items.additional.length > idx + 1) stringAdditional += " / ";
        });
        setAdditional(stringAdditional);
        setTotalAdditional(valueTotalAdditional);
      })();
    }
    return () => (amoted = false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Text style={styles.titleProduct}>{items.name}</Text>
        <Text style={styles.amountProduct}>
          Quant. {items.amount} {items.measureUnid}
        </Text>
        {items.additional.length > 0 && (
          <>
            <Text style={styles.textAddicional}>Adicionais: {additional}</Text>
          </>
        )}
      </View>
      <View style={styles.priceProduct}>
        <Text style={styles.totalProduct}>
          {formatMoney(items.price * items.amount)}
        </Text>
        {totalAdditional > 0 && (
          <Text style={styles.totalAdditional}>
            {formatMoney(totalAdditional)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MyOrdesItem;
