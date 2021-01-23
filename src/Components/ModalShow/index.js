import React from 'react';
import { Modal, View, Text } from "react-native";
import styles from './styles';

const ModalShow = ({visible, title='', children}) => {
    return (
        <Modal animationType="fade"
               transparent={true}
               visible={visible}
               onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={styles.contentModal}>
                    <View style={styles.headerModal}>
                    <Text style={styles.titleHeader}>{title}</Text>
                    </View>
                    <View style={styles.bodyModal}>
                        {children}
                    </View>
                </View>
            </View>
                       
        </Modal>
    );
}

export default ModalShow;


    