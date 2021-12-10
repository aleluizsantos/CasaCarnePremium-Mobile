import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const SubHeader = (props) => {
  const { title, subTitle, children } = props;
  return (
    <View style={styles.headerPromotion}>
      <Text style={styles.titlePromotion}>{title}</Text>
      {!!subTitle && <Text style={styles.subTitlePromotion}>{subTitle}</Text>}
      {children}
    </View>
  );
};

export default SubHeader;
