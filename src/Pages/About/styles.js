import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { fonts, colors } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  imageLogo: {
    resizeMode: "contain",
    position: "absolute",
    height: 120,
    width: 210,
    zIndex: 1,
    top: 50,
  },
  imageHeader: {
    width: "100%",
    height: 180,
  },
  box: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
    width: "95%",
    margin: 10,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  subTitle: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
  },
  fieldsGroup: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  field: {
    marginLeft: 10,
  },
  textFiel: {
    fontSize: fonts.big,
    fontWeight: "bold",
  },
  goBack: {
    position: "absolute",
    zIndex: 1,
    left: 15,
    top: 20,
  },
});

export default styles;
