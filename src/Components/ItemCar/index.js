import React, {useContext} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';

import styles from "./styles";
import { colors, formatMoney } from "../../Styles";

import Requests from '../../Contexts/requests';
//-----------------------------------------------------------------------------
//  Componete do Item do carrinho
//-----------------------------------------------------------------------------
const ItemCar = ({itemCar}) => {    
    const { removeItemCar, upAmountProduct, downAmountProduct } = useContext(Requests);

    /**
     * Remove o item do Carrinho de compra
     * @param {Object} _item 
     */
    function handleRemoveItemCar(_item) {
        removeItemCar(_item);
    }
    /**
     * Incrementar um valor na quantidade de produto
     * @param {Object} _itemCar Recebe o objeto itemCar e incrementa a quantidade do produto.
     */
    function handleUpItem(_itemCar) {
        upAmountProduct(_itemCar);
    }
    /**
     * Descrementar um valor na quantidade de produto
     * @param {Object} _itemCar Recebe o objeto itemCar e descrementa a quantidade do produto.
     */
    function handleDownItem(_itemCar) {
        downAmountProduct(_itemCar);
    }
    //------------------------------------------------------------------------------------
    // Retorno da função renderização 
    //------------------------------------------------------------------------------------
    return (
        <View style={styles.container}>
            {!!itemCar.promotion && <Text style={styles.textPromotion}>PROMOÇÃO</Text>}
            <View style={styles.product}>
                <Image
                    style={styles.imgProduct}
                    source={{ uri: itemCar.image_url }}
                />
                <View>
                    <Text style={styles.description}>{itemCar.name}</Text>
                    <Text style={styles.price}>
                        {itemCar.promotion ? 
                        `De ${formatMoney(itemCar.price)}/ ${itemCar.measure} por ${formatMoney(itemCar.pricePromotion)}`
                        :
                        `${formatMoney(itemCar.price)} / ${itemCar.measure}`
                        } 
                    </Text>
                    <Text style={styles.total}>{formatMoney((itemCar.promotion ? itemCar.pricePromotion : itemCar.price) * itemCar.amount)}
                    </Text>
                </View>
            </View>
            <View style={styles.groupButton}>
                <TouchableOpacity onPress={() => handleRemoveItemCar(itemCar)}>
                    <Feather name="trash-2"
                        size={22}
                        color={colors.regular}
                    />
                </TouchableOpacity>

                <View style={styles.button}> 
                    <TouchableOpacity onPress={()=>handleDownItem(itemCar)}>
                        <AntDesign name="minuscircleo" size={20} color={colors.darker} />
                    </TouchableOpacity>

                    <Text style={styles.textAmount}>{itemCar.amount}</Text>

                    <TouchableOpacity onPress={()=> handleUpItem(itemCar)}>
                        <AntDesign name="pluscircleo" size={20} color={colors.darker} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ItemCar;