import { StyleSheet } from "react-native";
import { fonts, colors } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  imageHeader: {
    width: "100%",
    height: 200,
  },
  imageLogo: {
    position: "absolute",
    resizeMode: "contain",
    top: 80,
    height: 150,
    width: 150,
    zIndex: 1,
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
  openClose: {
    position: "absolute",
    top: 40,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Archivo_700Bold",
    color: colors.white,
    zIndex: 1,
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
    top: 25,
  },
});

export default styles;
