import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  itemCategory: {
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 5,
    width: 110,
    height: 130,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.light,
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

    // position: "absolute",
    // top: 80,
    // height: "35%",
    // width: "85%",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 5,
    // backgroundColor: colors.light,
    // marginHorizontal: 8,
  },
  textTitleItemCategory: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: fonts.small,
    textAlign: "center",
    color: colors.dark,
  },
});

export default styles;
