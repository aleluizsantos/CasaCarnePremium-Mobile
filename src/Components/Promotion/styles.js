import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  promotionContent: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    height: 106,
    width: "100%",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
