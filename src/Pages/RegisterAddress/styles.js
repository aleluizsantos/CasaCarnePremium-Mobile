import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { colors, fonts } from "../../Styles";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.lighter,
    },
    body: {
        paddingHorizontal: 0,
    },
    titleBody: {
        fontFamily: 'Archivo_700Bold',
        fontSize: fonts.big,
        textAlign: 'justify',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: colors.regular,
    },
    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 20,
        fontSize: 14,
        borderWidth: 1,
        borderColor: colors.light,
    },
    Touchable: {
        position: 'absolute',
        right: 10,
        top: 18,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 30,
        zIndex: 1,
    },
    IconInput: {
        color: colors.light,
    },
    fieldGroup: {
        flexDirection: 'row',
    },
    groupAddress: {
        marginRight: 10,
        width: '72%',
    },
    groupNumber: {
        width: '26%',
    },
    buttonRegister: {
        backgroundColor: colors.primary,
        height: 50,
        width: 150,
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
    titleButtonRegister: {
        fontFamily: 'Archivo_700Bold',
        color: colors.darker,
    },
    buttonCancel: {
        backgroundColor: colors.light,
        height: 50,
        width: 150,
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
    containerButtonAdd: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonAdd: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 55,
        width: 55,
    },
    buttonGoBack:{
        position: 'absolute',
        left : 20,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 55,
        width: 55,
    },
    address: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: colors.light,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.light,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
    },
    textAddress: {
        fontSize: fonts.smaller,
    },
    iconeAddress: {
        flexDirection: 'row',
    },
    buttonAddress: {
        paddingLeft: 5,
    },
    titleAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        marginBottom: 10
    },
    validate: {
        borderWidth: 1,
        borderColor: colors.red,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 8,
        backgroundColor: "white",
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    titleUpdate: {
        fontFamily: 'Archivo_700Bold',
        fontSize: fonts.big,
        alignSelf: 'flex-start',
        padding: 15,
    },
});

export default Styles;