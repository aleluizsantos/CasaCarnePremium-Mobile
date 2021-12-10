import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  contentModal: {
    margin: 20,
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerModal: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  imgHeader: {
    position: "absolute",
    resizeMode: "stretch",
    width: "108%",
    height: 150,
    top: -5,
    left: -10,
  },
  titleHeader: {
    fontFamily: "Archivo_700Bold",
    textAlign: "center",
    fontSize: fonts.bigger,
    color: colors.darker,
  },
  imgConfirmed: {
    resizeMode: "contain",
    height: 120,
    marginVertical: 20,
  },
  imgLogo: {
    height: 100,
    width: 100,
  },
  bodyModal: {
    padding: 10,
  },
  footerButtom: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "80%",
    height: 50,
    paddingTop: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonOutline: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.regular,
    width: "80%",
    height: 50,
    paddingTop: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  textButton: {
    fontFamily: "Poppins_400Regular",
    color: colors.white,
  },
});

export default styles;
