import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
  },
  totalContent: {
    backgroundColor: "#FFF2DE",
    padding: 10,
  },
  containtImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textNotItemCart: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  imgCartEmpty: {
    resizeMode: "contain",
    width: 250,
    height: 200,
  },
  fieldGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    color: colors.white,
  },
  labelTotal: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  taxaDelivery: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
  },
  total: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  footerButtom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "80%",
    height: 50,
    paddingTop: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonOutline: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.regular,
    width: "80%",
    height: 50,
    paddingTop: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  textButton: {
    fontFamily: "Poppins_400Regular",
    color: colors.white,
  },
  titleModal: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    marginTop: 40,
  },
});

export default Styles;
