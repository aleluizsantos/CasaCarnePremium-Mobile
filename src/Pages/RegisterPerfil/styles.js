import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  body: {
    marginHorizontal: 20,
  },
  titleBody: {
    marginTop: 15,
    fontWeight: "700",
    textAlign: "justify",
  },
  titleDescription: {
    textAlign: "justify",
    lineHeight: 20,
    fontSize: fonts.small,
    paddingTop: 8,
    paddingBottom: 18,
    color: colors.regular,
  },
  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.light,
    fontFamily: "Archivo_700Bold",
  },
  Touchable: {
    position: "absolute",
    right: 10,
    top: 18,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 30,
    zIndex: 1,
  },
  IconInput: {
    color: colors.light,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonCancelar: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 8,
  },
  titleButtonCancel: {
    fontFamily: "Archivo_700Bold",
    color: colors.darker,
  },

  buttonRegister: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 8,
  },
  titleButtonRegister: {
    fontFamily: "Archivo_700Bold",
    color: colors.darker,
  },

  validate: {
    borderWidth: 1,
    borderColor: colors.red,
  },
});

export default styles;
