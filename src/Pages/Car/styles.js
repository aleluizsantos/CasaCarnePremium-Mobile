import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { colors, fonts } from "../../Styles";
import { FontAwesome } from "@expo/vector-icons";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  totalContent: {
    backgroundColor: '#FFF2DE',
    padding: 10,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
  },
  containtImage:{
    height: '100%',
    alignItems: "center",
    marginTop: 100,   
  },
  textNotItemCart:{
    fontFamily: 'Archivo_400Regular',
    fontSize: fonts.small,
  },
  imgCartEmpty:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  fieldGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: colors.primary,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  textButtonConfirm: {
    fontFamily: 'Archivo_700Bold',
    fontSize: fonts.big,
    color: colors.darker,
  },
  labelTotal:{
    fontFamily: 'Archivo_700Bold',
    fontSize: fonts.big,
  },
  taxaDelivery: {
    fontFamily: 'Archivo_400Regular',
    fontSize: fonts.small,
  },
  total: {
    fontFamily: 'Archivo_700Bold',
    fontSize: fonts.big,
  }
});

export default Styles;
