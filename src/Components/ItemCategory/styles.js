import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../../Styles";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  itemCategory: {
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 8,
    width: width / 2 - 32,
    height: height / 3.5 - 68,
    // width: 165,
    // height: 145,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgItemContent: {
    height: "65%",
    backgroundColor: colors.lighter,
  },
  imgItemCategory: {
    width: "100%",
    height: "100%",
  },
  titleItemCategory: {
    position: "absolute",
    bottom: 0,
    height: "35%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: colors.lighter,
  },
  textTitleItemCategory: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: fonts.regular,
    textAlign: "center",
    color: colors.dark,
  },
});

export default styles;
