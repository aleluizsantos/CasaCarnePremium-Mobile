import { StyleSheet, OpaqueColorValue } from "react-native";
import Constants from "expo-constants";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.lighter,
  },
  body: {
    paddingHorizontal: 10,
  },
  titleItem: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: colors.light,
    paddingLeft: 15,
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
  },
  validation: {
    borderWidth: 2,
    borderColor: colors.red,
  },
  containerModal: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  textFinally: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.bigger,
    marginTop: 30,
  },
  textWarning: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.regular,
    lineHeight: 20,
    textAlign: "center",
    color: colors.darker,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  textConfirm: {
    fontSize: fonts.small,
    color: colors.regular,
    fontWeight: "bold",
  },
  iconReturn: {
    position: "absolute",
    bottom: 20,
  },
  imageShopping: {
    marginTop: 80,
    height: 150,
    width: 150,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.transparent,
    alignItems: "center",
    justifyContent: "center",
  },
  textProcessing: {
    color: colors.white,
    paddingVertical: 20,
  },
  groupInline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textDelivery: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  labelItem: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: fonts.small,
    paddingLeft: 15,
    color: colors.dark,
  },
  addressLoja: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  observationsContent: {
    backgroundColor: colors.success,
  },
  totalContent: {
    backgroundColor: "#FFF2DE",
    marginTop: 5,
    padding: 10,
  },
  fieldBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelTotal: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.smaller,
  },
  labelValueTotal: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
  },
  labelTotalEnd: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  labelValueEnd: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.big,
  },
  textAddressNotExist: {
    fontFamily: "Archivo_400Regular",
    fontSize: fonts.regular,
    lineHeight: 20,
    textAlign: "justify",
    padding: 15,
    color: colors.darker,
  },
  buttomSelectAddress: {
    backgroundColor: colors.lighter,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  addressActive: {
    backgroundColor: colors.primary,
  },
  ListPayments: {
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  paymentSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonPayments: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: colors.light,
    paddingLeft: 15,
    padding: 5,
    borderRadius: 8,
  },
  textAddress: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.small,
  },
  textneighborhood: {
    fontSize: fonts.smaller,
    color: colors.dark,
  },
  textButtonDate: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: fonts.small,
    paddingTop: 5,
  },
  Scheduling: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  textSchedule: {
    fontSize: fonts.small,
  },
  groupSchedule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputObservation: {
    backgroundColor: colors.white,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    height: 80,
    marginBottom: 8,
  },
  buttonConfirm: {
    backgroundColor: colors.primary,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  textButtonConfirm: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    color: colors.darker,
  },
  buttomModal: {
    backgroundColor: colors.lighter,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  active: {
    backgroundColor: colors.primary,
  },
  containerButtonAdd: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 2,
    borderTopColor: colors.lighter,
    width: "100%",
  },
  buttonNewAddress: {
    backgroundColor: colors.white,
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleButtonNewAddress: {
    fontFamily: "Archivo_700Bold",
    fontSize: fonts.small,
    color: colors.darker,
  },
  titleTotal: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.smaller,
    marginVertical: 5,
  },
  textCoupon: {
    color: colors.red,
    fontSize: fonts.smaller,
    marginLeft: 5,
    paddingBottom: 5,
  },
  inputBlock: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.white,
    height: 50,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginRight: 10,
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },
  groupCoupon: {
    position: "relative",
    width: "70%",
  },
  CouponSuccess: {
    borderWidth: 1,
    borderColor: colors.success,
  },
  CouponInvalid: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  inputCoupon: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  checkSuccess: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    height: 50,
    width: "27%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonDisable: {
    backgroundColor: colors.light,
    opacity: 0.2,
  },
  textButtonApply: {
    fontFamily: "Archivo_700Bold",
    color: colors.darker,
  },
  contentThing: {
    fontFamily: "Poppins_400Regular",
    fontSize: fonts.small,
    color: "#000",
    paddingLeft: 20,
  },
});

export default Styles;
