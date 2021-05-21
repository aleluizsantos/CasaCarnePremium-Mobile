import React, { useState, useContext, createContext } from "react";
import api from "../Services/api";
import auth from "../Contexts/auth";

const RequestContextData = {
  itemCar: [Object],
  addressStore: Object,
  openClose: Boolean,
  updateDB: String,
  totalCar: Number,
  paymentType: Number,
  deliveryType: Number,
  addItemCar: Function,
  removeItemCar: Function,
  updateAmountCart: Function,
  upAmountProduct: Function,
  downAmountProduct: Function,
  validationCoupom: Function,
  addPaymentType: Function,
  addDeliveryType: Function,
  checkout: Function,
  updateStatusOpenClose: Function,
  checkOpenClose: Function,
  updateBDsytem: Function,
  isloading: Boolean,
};

const RequestContext = createContext(RequestContextData);

export default RequestContext;

export const RequestProvider = ({ children }) => {
  const { signOut } = useContext(auth);
  const [itemCar, setItemCar] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [totalCar, setTotalCar] = useState(0);
  const [addressStore, setAddressStore] = useState("");
  const [openClose, setOpenClose] = useState(false);
  const [updateDB, setupdateDB] = useState("");
  const [isloading, setIsloading] = useState(true);

  function updateBDsytem(timeStamp) {
    setupdateDB(timeStamp);
  }
  // Soma o valor no total do carrinho
  //------------------------------------------------------------------------
  function SumItemCart(_item) {
    const price =
      _item.amount * (_item.promotion ? _item.pricePromotion : _item.price);
    setTotalCar(totalCar + price);
  }
  // Subtrai o valor no total do carrinho
  //------------------------------------------------------------------------
  function SubtractItemCart(_item) {
    const price =
      _item.amount * (_item.promotion ? _item.pricePromotion : _item.price);
    setTotalCar(totalCar - price);
  }
  // Adicionar item no carrinho de compra
  //------------------------------------------------------------------------
  function addItemCar(_item) {
    SumItemCart(_item); //somar o total do carrinho
    setItemCar([...itemCar, _item]);
  }
  // Remover item do carrinho de compra
  //------------------------------------------------------------------------
  function removeItemCar(_item) {
    SubtractItemCart(_item); //Subtrair o valor do total do carrinho
    // Remover o itemdo carrinho
    const NewItemCar = itemCar.filter((item) => {
      return item.name !== _item.name;
    });
    // Retorna nova lista
    setItemCar(NewItemCar);
  }
  // Adicionarm o tipo de pagamento
  //------------------------------------------------------------------------
  function addPaymentType(_paymentType) {
    setPaymentType(_paymentType);
  }
  // Adicionar o Tipo de entrega
  //------------------------------------------------------------------------
  async function addDeliveryType(id) {
    setDeliveryType(id);
    // Carregar o endereço da Loja
    await api
      .get("addressStore")
      .then((response) => {
        setAddressStore(response.data);
      })
      .catch((err) => {
        signOut();
      });
  }
  // Finaliza o Carrinho de compra
  //------------------------------------------------------------------------
  function checkout() {
    setItemCar([]);
    setPaymentType("");
    setTotalCar(0);
  }
  // Adicionar um coupom
  //------------------------------------------------------------------------
  async function validationCoupom(_coupon) {
    const couponValidation = await api.get(`coupon/validation/${_coupon}`, {
      headers: {
        payment: paymentType.id,
      },
    });
    return couponValidation.data;
  }
  // Atualizar a quantidade de um produto no carrinho
  //------------------------------------------------------------------------
  async function updateAmountCart(_itemCar, _oldAmount, _newAmount) {
    const price = _itemCar.promotion ? _itemCar.pricePromotion : _itemCar.price;

    const newItemCar = await itemCar.map((item) => {
      if (item.product_id === _itemCar.id) {
        item.amount = _newAmount;

        if (_oldAmount < _newAmount) {
          const newTotal = price * _newAmount - price * _oldAmount;
          setTotalCar(totalCar + newTotal);
        }
        if (_oldAmount > _newAmount) {
          const newTotal = price * _oldAmount - price * _newAmount;
          setTotalCar(totalCar - newTotal);
        }
      }
      return item;
    });
    // Atualiza a lista do carrinho
    setItemCar(newItemCar);
  }
  // Incrementar quantidade de produto no carrinho
  //------------------------------------------------------------------------
  async function upAmountProduct(_itemCar) {
    //Acrescentando meio kilo na quantidade
    const amount = _itemCar.amount + 0.5;
    // Valor acrescentado do meio quilo
    const valueAmount =
      (_itemCar.promotion ? _itemCar.pricePromotion : _itemCar.price) * 0.5;
    // Atualizar a quantidade do produto no carrinho
    const newItemCar = await itemCar.map((item) => {
      if (item.product_id === _itemCar.product_id) {
        item.amount = amount;
        setTotalCar(totalCar + valueAmount);
      }
      return item;
    });
    // Atualiza a lista do carrinho
    setItemCar(newItemCar);
  }
  // Decrementar quantidade de produto no carrinho
  //------------------------------------------------------------------------
  async function downAmountProduct(_itemCar) {
    //Acrescentando meio kilo na quantidade
    const amount = _itemCar.amount - 0.5;
    // Verificar se a quantidade é igual a zero, se for igual a 0
    // excluir o produto do carrinho
    if (amount < 0) {
      removeItemCar(_itemCar);
      return;
    }
    // Valor acrescentado do meio quilo
    const valueAmount =
      (_itemCar.promotion ? _itemCar.pricePromotion : _itemCar.price) * 0.5;
    // Percorrer o array Carinho e verificar se existe o item para alterar quantidade
    const newItemCar = await itemCar.map((item) => {
      if (item.product_id === _itemCar.product_id) {
        item.amount = amount;
        setTotalCar(totalCar - valueAmount);
      }
      return item;
    });
    // Atualiza a lista do carrinho
    setItemCar(newItemCar);
  }
  // Check se o estabelecimento esta Aberto ou Fechado
  //------------------------------------------------------------------------
  async function checkOpenClose() {
    try {
      await api.get("operation").then((response) => {
        const { open_close } = response.data;
        !!open_close && setOpenClose(Number(open_close));
        setIsloading(false);
      });
    } catch (error) {
      Alert.alert("Erro no Servidor", error.message, [
        {
          text: "OK",
          onPress: () => signOut(),
          style: "cancel",
        },
      ]);
    }
  }

  function updateStatusOpenClose(status) {
    setOpenClose(status);
  }

  return (
    <RequestContext.Provider
      value={{
        itemCar,
        totalCar,
        paymentType,
        deliveryType,
        addressStore,
        openClose,
        updateDB,
        validationCoupom,
        addItemCar,
        removeItemCar,
        addPaymentType,
        addDeliveryType,
        updateAmountCart,
        upAmountProduct,
        downAmountProduct,
        checkout,
        checkOpenClose,
        updateStatusOpenClose,
        updateBDsytem,
        isloading,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
