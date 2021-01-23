import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.transparent,
    },
    contentModal:{
        margin: 20,
        borderRadius: 20,
        backgroundColor: colors.white,
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
    headerModal: {
        backgroundColor: colors.primary,
        
        padding: 10,        
        marginBottom: 10,
    },
    titleHeader:{
        fontFamily: "Archivo_700Bold",
        textAlign: 'center',
        fontSize: fonts.big,
        color: colors.darker
    },
    bodyModal: {
        padding: 10,
    },
});

export default styles;