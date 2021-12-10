import React, { useState } from "react";
import { View, Text, CheckBox, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../../Styles";
import styles from "./styles";

const Additional = ({ title, additional, open, onChange, onValues }) => {
  const [openItem, setOpenItem] = useState(open);

  const handleSelection = (itemSelect) => {
    // Se o item escolhido for de várias opções
    if (itemSelect.manySelected) {
      // Checar a quantidde se foi definada de escolha
      const limitAdditional = Number(itemSelect.limitAdditional);
      const amountAdditional = onValues.filter(
        (item) => item.typeAdditional_id === itemSelect.typeAdditional_id
      ).length;

      // Checar se o elemento selecionado já esta na lista
      const isSelected = existElement(itemSelect.id);
      // Caso o item esteja selecionado retirar ele da lista
      if (isSelected) {
        // Retirado da lista o item selecionado
        const newListItemDeleted = onValues.filter(
          (item) => item.id !== itemSelect.id
        );
        onChange(newListItemDeleted);
      } else {
        if (amountAdditional < limitAdditional || limitAdditional === 0) {
          onChange([...onValues, itemSelect]);
        } else {
          Alert.alert(
            "Limite excedido",
            `Você pode escolher apenas ${amountAdditional} itens.`,
            [
              {
                text: "OK",
                style: "destructive",
              },
            ]
          );
        }
      }
    } else {
      // Podera selecionar apenas um da lista
      // Checar se o item escolhido esta na lista
      // caso não estiver return undefined
      const isSelected = onValues.find((item) => item.id === itemSelect.id);

      if (typeof isSelected === "undefined") {
        // Remove todo tido de categoria da lista
        const newList = onValues.filter(
          (item) => item.typeAdditional_id !== itemSelect.typeAdditional_id
        );
        onChange([...newList, itemSelect]);
      } else {
        //Removido o item selecionado da lista ele estava selecionado
        // retiramos ele da lista
        const newList = onValues.filter((item) => item.id !== itemSelect.id);
        onChange(newList);
      }
    }
  };

  const existElement = (id) => {
    return onValues.findIndex((item) => item.id === id) >= 0 ? true : false;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonToogle}
        onPress={() => setOpenItem(!openItem)}
      >
        <Text style={styles.textTitleAdditional}>{title}</Text>

        <AntDesign
          name={openItem ? "up" : "down"}
          size={22}
          color={colors.regular}
        />
      </TouchableOpacity>

      {openItem &&
        additional.map((item) => {
          return (
            <View key={item.id} style={styles.contentAdditional}>
              <CheckBox
                value={existElement(item.id)}
                onValueChange={() => handleSelection(item)}
                tintColors={{ true: colors.primary }}
                style={styles.checkbox}
              />
              <View style={styles.textGroupAdditional}>
                <Text style={styles.textDescription}>{item.description}</Text>
                {item.price === "0.00" ? (
                  <Text style={styles.textFree}>Grátis</Text>
                ) : (
                  <Text style={styles.text}>R$ {item.price}</Text>
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default Additional;
