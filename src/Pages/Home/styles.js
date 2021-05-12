import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
  },
  imgLogo: {
    height: 200,
    width: 200,
    margin: 20,
  },
  status: {
    backgroundColor: colors.darker,
    color: colors.white,
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.darker,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: "row",
  },
  textButton: {
    color: colors.dark,
    fontWeight: "bold",
  },
  iconButton: {
    marginHorizontal: 10,
  },
  contentAttend: {
    justifyContent: "center",
    paddingVertical: 10,
    marginLeft: 40,
  },
  textAttend: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.regular,
    paddingVertical: 5,
  },
  buttonAttend: {
    backgroundColor: colors.lighter,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  nameUser: {
    fontFamily: "Archivo_400Regular",
    fontSize: 14,
  },
  messageError: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.big,
    lineHeight: 24,
    paddingHorizontal: 50,
    color: colors.dark,
    textAlign: "center",
  },
  version: {
    position: "absolute",
    color: colors.lighter,
    fontSize: fonts.small,
    bottom: 20,
    right: 20,
  },
});

export default Styles;
