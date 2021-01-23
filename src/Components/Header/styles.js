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
  titleUser: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.small,
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
  car:{
    padding: 12,
  },
  indicateCar: {
    position: "absolute",
    right: 8,
    top: 10,
  },
});

export default styles;
