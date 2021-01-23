import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
        elevation: 5
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
        textAlign: 'center',
    },
    groupText:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    textValuePromotion:{
        fontSize: fonts.regular,
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
    buy:{
        opacity: 0.3,
    },
    textUnit: {
        position: 'absolute',
        backgroundColor: colors.light,
        padding: 2,
        borderRadius: 3,
        left: 5,
        top: 5,
        fontFamily: 'Archivo_700Bold',
        fontSize: fonts.smaller,
    },
    imgContent: {
        backgroundColor: colors.primary,
        height: '50%',
    },
    description: {
        height: '25%',
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    titleDescription: {
        fontFamily: 'Archivo_700Bold',
        fontSize: fonts.smaller,
        color: colors.dark,
        textAlign: 'center',
        lineHeight: 16,
    },
    priceContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 5,
        height: '25%',
    },
    imgProduct: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    textPrice: {
        fontFamily: "Archivo_700Bold",
    }
});

export default styles;