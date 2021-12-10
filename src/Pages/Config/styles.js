import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { fonts, colors } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  body: {
    padding: 20,
  },
  fieldsGroup: {
    paddingVertical: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.light,
  },
  title: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.big,
    marginLeft: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Styles;
