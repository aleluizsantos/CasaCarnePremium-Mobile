import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.lighter,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCategory: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 15,
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    textAlign: "center",
  },
  categoryContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
