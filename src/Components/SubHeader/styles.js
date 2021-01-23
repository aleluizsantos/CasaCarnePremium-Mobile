import { StyleSheet } from "react-native";
import { colors, fonts } from "../../Styles";

const styles = StyleSheet.create({
    headerPromotion: {
        backgroundColor: colors.light,
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: colors.lighter,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titlePromotion: {
        fontFamily: "Poppins_600SemiBold",
        marginLeft: 10,
    },
    subTitlePromotion: {
        fontFamily: "Poppins_400Regular",
        fontSize: fonts.smaller,
        marginLeft: 10,
    },
});

export default styles;