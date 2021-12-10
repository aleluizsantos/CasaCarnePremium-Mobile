import { StyleSheet, Dimensions } from "react-native";

import { colors, fonts } from "../../Styles";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  buttonToogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lighter,
    marginBottom: 10,
  },
  contentAdditional: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
    borderStyle: "dashed",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  textTitleAdditional: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    width: "90%",
  },
  checkbox: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  textGroupAdditional: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  text: {
    fontFamily: "Poppins_400Regular",
  },
  textFree: {
    color: colors.success,
    fontWeight: "bold",
  },
  textDescription: {
    fontFamily: "Poppins_400Regular",
    width: "75%",
  },
});

export default styles;
