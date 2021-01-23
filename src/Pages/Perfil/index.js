import React, {useEffect, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import { AntDesign } from '@expo/vector-icons';

import Auth from "../../Contexts/auth";
import styles from "./styles";
import { colors } from "../../Styles";

function Perfil() {
    const { user } = useContext(Auth);
    const [modalVisible, setModalVisible] = useState(false);
    const [validateInput, setValidateInput] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    },[])

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Editar Perfil</Text>
                        <View style={styles.form}>
                            <View>
                                <TextInput
                                    style={[styles.input, validateInput && !!!name && styles.validate]}
                                    autoFocus={true}
                                    placeholder='Nome'
                                    keyboardType='default'
                                    value={name}
                                    onChangeText={setName}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={[styles.input, validateInput && !!!email && styles.validate]}
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={setEmail}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View>
                                <TextInputMask
                                    style={[styles.input, validateInput && !!!phone && styles.validate]}
                                    placeholder='Telefone'
                                    type={'cel-phone'}
                                    value={phone}
                                    onChangeText={setPhone}
                                    returnKeyType="next"
                                    onSubmitEditing={() => { }}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={styles.containerButtonAdd}>
                                <TouchableOpacity style={styles.buttonUpDatePerfil} onPress={() => { }}>
                                    <Text style={styles.titleButtonRegister}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancelModal} onPress={() => { setModalVisible(!modalVisible) }}>
                                    <Text style={styles.titleButtonCancel}>Voltar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.avatar}>
                <Image source={{ uri: `https://www.futurocientista.net/img/equipe/default_fem.jpg` }}
                    style={styles.imgAvatar} />
                <TouchableOpacity style={styles.buttonCamera} onPress={() => Alert.alert('teste')}>
                    <AntDesign name="camerao"
                        size={38}
                        color={colors.darker}
                        style={styles.cameraIcon}
                    />
                </TouchableOpacity>
            </View>
            
            <Text style={styles.titleUser}>{user.name.split(' ')[0]}</Text>

            <View style={styles.dataUser}>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <Text style={styles.value}>{user.name}</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <Text style={styles.value}>{user.phone}</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <Text style={styles.value}>********</Text>
                </View>
            </View>

            <View style={styles.groupButton}>
                <TouchableOpacity style={styles.buttonEditPerfil} onPress={() => setModalVisible(!modalVisible)} >
                    <Text>Editar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={handleGoBack} >
                    <Text>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Perfil;
