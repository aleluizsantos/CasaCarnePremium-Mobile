import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  titleCategory: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    color: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryContent: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default styles;
