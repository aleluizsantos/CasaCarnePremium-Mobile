import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
  itemPromotion: {
    position: "relative",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D0870E",
    padding: 5,
    borderRadius: 8,
    width: 80,
    height: 90,
    overflow: "hidden",
    marginRight: 10,
  },
  imgItempromotion: {
    height: 60,
    width: 60,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.white,
  },
  titleItemPromotion: {
    position: "absolute",
    top: 50,
    backgroundColor: "#2A2823",
    color: colors.white,
    paddingHorizontal: 10,
    fontSize: fonts.smaller,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  priceItemPromotion: {
    position: "absolute",
    textAlign: "center",
    width: "100%",
    top: 67,
    fontSize: fonts.small,
    backgroundColor: colors.white,
    borderRadius: 2,
    paddingHorizontal: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
textInformedAmount: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
},
textModalProduct: {
    fontSize: fonts.bigger,
},
groupText:{
    flexDirection: 'row',
    alignItems: 'center',
},
textValuePromotion:{
    fontSize: fonts.big,
    fontWeight: 'bold',
    color: colors.red,
},
modalView: {
    margin: 8,
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
groupAmount: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
},
textAmout: {
    fontSize: 35,
    paddingHorizontal: 45,
},
textAlertProductCarts: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 16,
    paddingBottom: 20,
    color: colors.red,
    textAlign: "center",
    lineHeight: 20,
},
textAlert:{
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    textAlign: "center",
    color: colors.darker,
},
containerButtonAdd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: colors.lighter,
    width: '100%',
},
buttonComprar: {
    backgroundColor: colors.primary,
    height: 50,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
titleButtonComprar: {
    fontFamily: 'Archivo_700Bold',
    color: colors.darker,
},
buttonCancel: {
    backgroundColor: colors.light,
    height: 50,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
titleButtonCancel: {
    fontFamily: 'Archivo_700Bold',
    color: colors.darker,
},
});

export default styles;
