import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import Header from "../../Components/Header";
import SubHeader from "../../Components/SubHeader";
import MyOrdesItem from "../../Components/MyOrdesItem";
import { colors, formatMoney, formatDataTime } from "../../Styles";
import styles from "./styles";
import api from "../../Services/api";

function MyOrderDetails() {
  const route = useRoute();
  const [dataItemRequest, setDataItemRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { request } = route.params;

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        await api.get(`request/items/${request.id}`).then((response) => {
          setDataItemRequest(response.data.itemsRequest);
          setIsLoading(false);
        });
      })();
    }
    return () => (amoted = false);
  }, []);

  return (
    <View style={styles.container}>
      <Header goBack={true} />
      <SubHeader title="Detalhe do Pedido">
        <View style={styles.subHeader}>
          <View style={styles.fieldGroup}>
            <View style={styles.contentDatetime}>
              <Feather name="clock" size={14} color={colors.darker} />
              <Text style={styles.textDateTime}>
                {formatDataTime(request.dateTimeOrder)}
              </Text>
            </View>
            <Text style={styles.textNumberOrder}>#{request.id}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.textTitle}>Tipo de pagamento</Text>
            <Text style={styles.textTotal}>{request.payment}</Text>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.textTitle}>Taxa de entrega</Text>
            <Text style={styles.textTotal}>
              {formatMoney(request.vTaxaDelivery)}
            </Text>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.cartCredit}>Total</Text>
            <Text style={styles.total}>
              {formatMoney(request.totalPurchase)}
            </Text>
          </View>
        </View>
      </SubHeader>

      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator size={48} color={colors.darker} />
        ) : (
          <ScrollView>
            {dataItemRequest.map((item) => (
              <MyOrdesItem key={item.id} items={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
export default MyOrderDetails;
