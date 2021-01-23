import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
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
});

export default styles;
