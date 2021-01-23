import { StyleSheet, ColorPropType } from "react-native";
import Constants from 'expo-constants';
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
    container: {
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
        fontSize: 14,
    },
    price: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 10,
        color: colors.regular,
    },
    total: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: colors.darker,
    },
});

export default styles;