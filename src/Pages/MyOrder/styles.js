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
    fontFamily: "Archivo_700Bold",
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#c8c8c8",
    fontSize: 20,
  },
});

export default Styles;
