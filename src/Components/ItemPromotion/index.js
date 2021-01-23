import React, {useState, useContext} from "react";
import { View, Image, Text, Modal,TouchableOpacity } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import Requests from '../../Contexts/requests';
import styles from "./styles";
import { formatMoney, colors } from "../../Styles";

const ItemPromotion = ({ productPromotion }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);
  const { addItemCar, itemCar, updateAmountCart } = useContext(Requests);

  const isBuy = itemCar.find((item)=> item.name === productPromotion.name);

  // Abrir modal para informar a quantidade do produto
  function handleInformedModal() {
    !!isBuy && setAmount(isBuy.amount);
    setModalVisible(true);
  }
  // Fechar o modal
  function handleCancelModal() {
      setModalVisible(false)
  }

  function handleAddCar(_productPromotion) {
    // Verificar se o item selecionado existe no carrinho
    if(!!!isBuy){
      addItemCar({
        "amount": amount, 
        "product_id":  _productPromotion.id,
        "name": _productPromotion.name,
        "image_url": _productPromotion.image_url,
        "measure": _productPromotion.measureUnid,
        "promotion": _productPromotion.promotion,
        "pricePromotion": _productPromotion.pricePromotion,
        "price": _productPromotion.price
      });
      }else{
      isBuy.amount !== amount &&
        updateAmountCart(_productPromotion, isBuy.amount, amount);
    }
      setModalVisible(false);
      setAmount(1); 
  }

  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false);
            setAmount('');
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.textInformedAmount}>Quantidade desejada!</Text>
                <Text style={styles.textModalProduct}>{productPromotion.name}</Text>
                <View style={styles.groupText}>
                    <Text>{formatMoney(productPromotion.price)}</Text>
                    {!!productPromotion.promotion && <Text style={styles.textValuePromotion}> por {formatMoney(productPromotion.pricePromotion)}</Text>}
                </View>

                <View style={styles.groupAmount}>
                    <TouchableOpacity onPress={() => setAmount(amount === 0 ?  0 : amount - 0.5 )}>
                        <AntDesign name="minussquare" size={48} color={colors.darker} />
                    </TouchableOpacity>

                    <Text style={styles.textAmout}>{amount}</Text>

                    <TouchableOpacity onPress={() => setAmount(amount + 0.5)}>
                        <AntDesign name="plussquare" size={48} color={colors.darker} />
                    </TouchableOpacity>
                </View>
                {!!isBuy ? 
                    <Text style={styles.textAlertProductCarts}>Você já comprou este produto, deseja aumentar a quantidade?</Text>
                :
                    <Text style={styles.textAlert}>Sr(a) cliente! durante a pesagem do produto pode ocorrer uma pequena variação no peso, para mais ou para menos.</Text>
                }

                <View style={styles.containerButtonAdd}>
                    <TouchableOpacity style={styles.buttonCancel} onPress={handleCancelModal}>
                        <Text style={styles.titleButtonCancel}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonComprar} onPress={()=> handleAddCar(productPromotion)}>
                        <Text style={styles.titleButtonComprar}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    <BorderlessButton onPress={handleInformedModal}>
      <View style={styles.itemPromotion}>
        <Image
          style={styles.imgItempromotion}
          source={{
            uri: productPromotion.image_url,
          }}
        />
        <Text style={styles.titleItemPromotion}>{productPromotion.name}</Text>
        <Text style={styles.priceItemPromotion}>{formatMoney(productPromotion.pricePromotion)}</Text>
      </View>
    </BorderlessButton>
  </>
  );
};

export default ItemPromotion;
