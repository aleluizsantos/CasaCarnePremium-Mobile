import { StyleSheet } from "react-native";
import { metrics, colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 70,
    paddingTop: metrics.headerPadding,
    paddingHorizontal: metrics.padding,
    borderBottomWidth: 1,
    borderColor: colors.lighter,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    paddingHorizontal: 10,
  },
  button: {
    alignContent: "flex-end",
  },
  logo: {
    height: 50,
    width: 50,
  },
  icon: {
    color: colors.primary,
  },
  nameUser: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.small,
    lineHeight: 15,
    flexDirection: "row",
    alignItems: "center",
    color: colors.dark,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    lineHeight: 15,
    flexDirection: "row",
    alignItems: "center",
    color: colors.dark,
  },
  containerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  car: {
    padding: 12,
  },
  indicateCar: {
    position: "absolute",
    right: 5,
    top: 10,
  },
  titleClose: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
    color: colors.red,
    textTransform: "capitalize",
    padding: 8,
    borderRadius: 8,
  },
});

export default styles;
