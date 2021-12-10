import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.primary,
    flex: 1,
  },
  contentBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.lighter,
  },
  footerButton: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgTitle: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Archivo_700Bold",
    textAlign: "center",
    fontSize: fonts.bigger,
    paddingTop: 15,
  },
  subTitle: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontSize: fonts.big,
    padding: 15,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: fonts.small,
    paddingHorizontal: 40,
    paddingVertical: 20,
    color: colors.regular,
    lineHeight: 20,
  },
  contentButton: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    margin: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    width: 150,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 18,
  },
  textButton: {
    fontWeight: "700",
    color: colors.primary,
    fontSize: fonts.big,
  },
  buttonOutline: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 18,
  },
  textButtonOutline: {
    fontWeight: "700",
    color: colors.white,
    fontSize: fonts.big,
  },
});

export default styles;
