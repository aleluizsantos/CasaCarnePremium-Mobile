import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { colors } from "../../Styles";

const { height } = Dimensions.get("window");

const ModalNotice = ({ show, close }) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.indicator} />
        <Text style={styles.title}>Pedido Finalizado</Text>
        <Text style={styles.text}>
          Sr(a) clinte, seu pedido foi enviado a nossa loja.
        </Text>
        <Text style={styles.text}>
          Lembrando que ao realizar a pesagem pode ocorrer variação. Acompanhe
          seu pedido pelo aplicativo.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={close}>
          <Text style={{ color: "#fff" }}>Fechar</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "absolute",
    zIndex: 1,
  },
  modal: {
    flex: 1,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  text: {
    marginTop: 8,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    // backgroundColor: "#9b59b6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default ModalNotice;
