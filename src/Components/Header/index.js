import React, { useContext, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Logo from "../../assets/Logo.png";

import AuthContext from "../../Contexts/auth";
import MyOrder from "../../Contexts/myOrder";

import styles from "./styles";
import { colors } from "../../Styles";

const Header = ({ goBack = false }) => {
  const { user } = useContext(AuthContext);
  const { itemCar, openClose, isloading } = useContext(MyOrder);

  const navigation = useNavigation();

  function handleNavigateToCar() {
    navigation.navigate("Car");
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {goBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color={colors.darker} />
          </TouchableOpacity>
        )}

        <Image source={Logo} style={styles.logo} />
        {Boolean(user) ? (
          <View style={styles.user}>
            <Text style={styles.nameUser}>{`Olá, ${
              user.name.split(" ")[0]
            }`}</Text>
            <Text style={styles.title}>Boas Compras</Text>
          </View>
        ) : (
          <View style={styles.user}>
            <Text style={styles.title}>Bem Vindo</Text>
          </View>
        )}
      </View>

      {isloading ? (
        <View>
          <ActivityIndicator size={28} color={colors.light} />
        </View>
      ) : openClose ? (
        <View>
          <TouchableOpacity onPress={handleNavigateToCar} style={styles.car}>
            <Feather name="shopping-cart" size={24} color="#484848" />
          </TouchableOpacity>
          {itemCar.length > 0 && (
            <Image
              source={require("../../assets/indicate.png")}
              style={styles.indicateCar}
            />
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Location")}>
          <Text style={styles.titleClose}>Loja Fechada</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(Header);
