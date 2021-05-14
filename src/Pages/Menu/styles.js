import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../Styles";

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
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    color: colors.primary,
  },
  breadcrumb: {
    fontFamily: "Archivo_400Regular",
    fontSize: 14,
    color: colors.primary,
  },
  productContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
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
    marginTop: 50,
    alignItems: "center",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  textIcon: {
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default Styles;
