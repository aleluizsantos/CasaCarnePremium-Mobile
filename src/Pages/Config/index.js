import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Header from "../../Components/Header";
import AuthContext from "../../Contexts/auth";
import styles from "./styles";
import { colors } from "../../Styles";

function Config() {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  function handleSignOut() {
    signOut();
  }

  function handleGotoRegisterAddress() {
    navigation.navigate('RegisterAddress');
  }

  function handleGoToPerfil() {
    navigation.navigate('Perfil');
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>
        <View style={styles.fieldsGroup}>
          <TouchableOpacity style={styles.button} onPress={handleGoToPerfil}>
            <Feather name="user" size={20} color="black" />
            <Text style={styles.title}>Meu Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldsGroup}>
          <TouchableOpacity style={styles.button} onPress={handleGotoRegisterAddress}>
            <Entypo name="location" size={20} color={colors.dark} />
            <Text style={styles.title}>Meu endereços</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldsGroup}>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <AntDesign name="logout" size={20} color="black" />
            <Text style={styles.title}>Desconectar da conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Config;
