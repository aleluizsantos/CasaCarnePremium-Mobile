import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

import { colors, fonts } from '../../Styles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  input: {
    height: 54,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 10,
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
  },
  contentInput: {
    position: 'relative',
  },
  indicator:{
    position: 'absolute',
    zIndex: 1,
    right: 15,
    top: 20,
  },
  containerProduct: {
    position: 'relative',
    backgroundColor: '#E6E6E6',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
},
product: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
textPromotion:{
    position: 'absolute',
    borderRadius: 8,
    padding: 5,
    backgroundColor: colors.red,
    color: colors.white,
    fontSize: 8,
    left: -18,
    top: 32,
    transform: [{ rotate: '-90deg'}],
    zIndex: 1,
},
imgProduct: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
},
groupButton: {
    position:  'relative',
    alignItems: 'flex-end',
},
button: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 20,
},
textAmount: {
    fontFamily: 'Archivo_700Bold',
    width: 40,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 10,
},
description: {
    fontFamily: 'Archivo_700Bold',
    fontSize: fonts.regular,
},
price: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: fonts.small,
    color: colors.regular,
},
total: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: fonts.big,
    color: colors.darker,
},
textLineBlock:{
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
  height: '100%',
},
block: {
  flexDirection: 'column',
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

export default Styles;
