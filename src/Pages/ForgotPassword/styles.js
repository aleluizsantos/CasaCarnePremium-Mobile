import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgForgotPassword: {
    marginBottom: 30,
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  forgotPassword: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.bigger,
  },
  descriptionForgot: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 20,
    fontSize: fonts.small,
    paddingTop: 8,
    paddingBottom: 32,
    color: colors.regular,
  },
  input: {
    height: 60,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.light,
  },
  validate: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  groupButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  buttonSubmit: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "48%",
  },
  buttonCancel: {
    backgroundColor: colors.light,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "48%",
  },
  textButtonReset: {
    fontFamily: "Archivo_700Bold",
    color: colors.darker,
  },
});

export default Styles;
