import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  body: {
    padding: 15,
  },
  emptyMyOrder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  textEmptyMyOrder: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  imgEmptyMyOrder: {
    resizeMode: "contain",
    width: 250,
    height: 200,
  },
});

export default Styles;
