import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  backgroundContainer: {
    flex: 1,
  },
  body: {
    padding: 25,
  },
  titleBody: {
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
    paddingTop: 10,
  },
  titleDescription: {
    fontFamily: "Poppins_400Regular",
    textAlign: "justify",
    lineHeight: 20,
    fontSize: fonts.small,
    paddingTop: 8,
    paddingBottom: 32,
    color: colors.regular,
  },
  messageError: {
    color: colors.red,
    textAlign: "center",
    paddingBottom: 10,
  },
  groupButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  buttonSignIn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 8,
  },
  titleButtonSignIn: {
    fontFamily: "Archivo_700Bold",
    color: "#4E1A15",
  },
  buttonRegister: {
    backgroundColor: colors.light,
    flexDirection: "row",
    height: 50,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 8,
  },
  titleRegister: {
    fontFamily: "Archivo_700Bold",
    color: "#4E1A15",
  },
  TitleButtonEsqueci: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "right",
    paddingRight: 10,
    color: colors.light,
    paddingVertical: 15,
  },
  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.light,
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
  validate: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: colors.light,
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
