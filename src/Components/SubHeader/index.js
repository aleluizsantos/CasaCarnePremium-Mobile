import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const SubHeader = (props) => {
    return (
        <View style={styles.headerPromotion}>
            <Text style={styles.titlePromotion}>{props.title}</Text>
            {!!props.subTitle && <Text style={styles.subTitlePromotion}>{props.subTitle}</Text>}
            {props.children}
        </View>
    );
};

export default SubHeader;