import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginBottom: 140,
  },
  body: {
    padding: 15,
  },
  textLoadMore: {
    fontFamily: "Archivo_400Regular",
    borderWidth: 1,
    borderColor: "#c6c6c6",
    textAlign: "center",
    color: "#c8c8c8",
    padding: 15,
    fontSize: 16,
  },
});

export default Styles;
