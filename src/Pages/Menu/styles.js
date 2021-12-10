import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.lighter,
    zIndex: 1,
  },
  TitleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
    // borderBottomWidth: 1,
    // borderBottomColor: colors.light,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    color: "#000",
  },
  breadcrumb: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
    color: "#000",
  },
  productContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 55,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "visible",
  },
  buttonCategory: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    top: -5,
    marginHorizontal: 5,
    paddingHorizontal: 2,
  },
  labelFooter: {
    fontFamily: "Archivo_700Bold",
    fontSize: 11,
    top: 2,
    paddingBottom: 5,
    color: "#c1bccc",
  },
  labelFooterActive: {
    fontFamily: "Archivo_700Bold",
    fontSize: 11,
    top: 2,
    paddingBottom: 5,
    color: "#32264d",
  },
  icoEmpty: {
    marginTop: 30,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    height: 200,
  },
  textIcon: {
    marginTop: 5,
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default Styles;
