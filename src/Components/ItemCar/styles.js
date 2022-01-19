import { StyleSheet } from "react-native";
import { colors } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 5,
    borderWidth: 0.5,
  },
  product: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentPromotion: {
    position: "absolute",
    left: -20,
    top: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  textPromotion: {
    backgroundColor: colors.red,
    borderRadius: 8,
    padding: 5,
    color: colors.white,
    fontSize: 8,
    transform: [{ rotate: "-90deg" }],
  },
  imgProduct: {
    height: 75,
    width: 75,
    borderRadius: 15,
    marginRight: 10,
  },
  groupButton: {
    position: "relative",
    alignItems: "flex-end",
  },
  button: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 38,
    right: 25,
  },
  buttonIncDec: {
    padding: 10,
  },
  textAmount: {
    fontFamily: "Archivo_700Bold",
    width: 40,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 10,
  },
  description: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
  },
  price: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: colors.regular,
  },
  total: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.darker,
  },
  textAddicional: {
    width: 220,
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
  },
});

export default styles;
