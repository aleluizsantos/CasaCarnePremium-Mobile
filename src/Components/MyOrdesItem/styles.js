import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  priceProduct: {
    alignItems: "flex-start",
    borderLeftWidth: 2,
    borderLeftColor: colors.light,
    paddingLeft: 5,
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  product: {
    flex: 1,
    paddingEnd: 5,
  },
  titleProduct: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.regular,
  },
  amountProduct: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
  },
  totalProduct: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  totalAdditional: {
    fontSize: fonts.smaller,
    color: colors.regular,
  },
  textAddicional: {
    paddingTop: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
  },
});

export default styles;
