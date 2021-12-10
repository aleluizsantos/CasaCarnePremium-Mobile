import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    borderWidth: 2,
    borderColor: colors.success,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  containerOpacity: {
    backgroundColor: colors.lighter,
    borderWidth: 1,
    borderColor: colors.light,
    opacity: 0.4,
  },
  fieldGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textNumberOrder: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
    color: colors.regular,
  },
  textDateTime: {
    fontSize: fonts.small,
    paddingLeft: 5,
  },
  total: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  details: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
    color: colors.red,
    padding: 5,
  },
  status: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
    color: colors.white,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 20,
  },
  timeDelivery: {
    position: "absolute",
    top: -2,
    right: 10,
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.small,
    color: colors.regular,
  },
});

export default styles;
