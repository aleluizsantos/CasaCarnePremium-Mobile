import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  fieldGroup: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeader: {
    padding: 8,
  },
  contentDatetime: {
    flexDirection: "row",
    alignItems: "center",
  },
  textDateTime: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
    paddingLeft: 5,
  },
  textNumberOrder: {
    position: "absolute",
    right: 5,
    top: -30,
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    color: colors.regular,
  },
  cartCredit: {
    fontSize: fonts.regular,
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
  },
  total: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  body: {
    padding: 10,
    marginBottom: 20,
  },
});

export default Styles;
