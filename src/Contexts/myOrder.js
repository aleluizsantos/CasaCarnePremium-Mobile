import React, { useState, createContext, useEffect } from "react";
import api from "../Services/api";

const MyOrderContextData = {
  itemCar: [Object],
  taxaDelivery: Object,
  setTaxaDelivery: Function,
  totalCar: Number,
  openClose: Boolean,
  setOpenClose: Function,
  typeDelivery: [Object],
  typePayments: [Object],
  setTypeDelivery: Function,

  selectedTypeDelivery: Object,
  selectedTypePayment: Object,

  setSelectedTypeDelivery: Function,
  setselectedTypePayment: Function,

  changeDB: Function,
  setChangeDB: Function,

  changeAmountCart: Function,
  addItemCar: Function,
  removeItemCar: Function,
  checkout: Function,
  isloading: Boolean,
};

const MyOrderContext = createContext(MyOrderContextData);

export default MyOrderContext;

export const MyOrderProvider = ({ children }) => {
  const [itemCar, setItemCar] = useState([]);
  const [totalCar, setTotalCar] = useState(0);
  const [taxaDelivery, setTaxaDelivery] = useState({});
  const [typeDelivery, setTypeDelivery] = useState([]);
  const [typePayments, setTypePayments] = useState([]);
  const [selectedTypePayment, setselectedTypePayment] = useState({});
  const [selectedTypeDelivery, setSelectedTypeDelivery] = useState(null);
  const [openClose, setOpenClose] = useState(false);
  const [changeDB, setChangeDB] = useState("");
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    let amoted = true;
    (async () => {
      await api.get("operation").then(async (response) => {
        setTypeDelivery(response.data.deliveryTyper);
        setOpenClose(response.data.open_close);
        setTaxaDelivery(response.data.taxaDelivery);
        await api.get("payment").then((response) => {
          setTypePayments(response.data);
          setIsloading(false);
        });
      });
    })();
    return () => (amoted = false);
  }, []);

  async function addItemCar(_item) {
    const { taxa, vMinTaxa } = taxaDelivery;
    const newItem = {
      id: itemCar.length + 1,
      ..._item,
    };
    const newItemCar = [...itemCar, newItem];

    let total = await newItemCar.reduce((total, itemProduct) => {
      return total + Number(itemProduct.totalItem);
    }, 0);

    if (total < vMinTaxa && total > 0) total = total + Number(taxa);

    setTotalCar(total);
    setItemCar(newItemCar);
  }

  async function removeItemCar(_item) {
    const { taxa, vMinTaxa } = taxaDelivery;
    // // Remover o itemdo carrinho
    const newItemCar = itemCar.filter((item) => {
      return item.id !== _item.id;
    });

    // Caso não possuir item no carrinho,
    if (newItemCar.length === 0) setSelectedTypeDelivery(null);

    let total = await newItemCar.reduce((total, itemProduct) => {
      return total + Number(itemProduct.totalItem);
    }, 0);

    if (total < vMinTaxa && total > 0) total = total + Number(taxa);

    setTotalCar(total);
    setItemCar(newItemCar);
  }

  async function changeAmountCart(itemProduct) {
    setIsloading(true);
    const { taxa, vMinTaxa } = taxaDelivery;

    const newItem = itemCar.map((item) => {
      if (item.id === itemProduct.id) {
        return {
          ...item,
          amount: itemProduct.amount,
          listAdditional: itemProduct.listAdditional,
          totalItem: itemProduct.totalItem,
        };
      }
      return item;
    });

    // // Remover o item antido
    // let newItem = itemCar.filter((item) => item.id !== itemProduct.id);
    // // Adicionar o item atualizado
    // newItem.push(itemProduct);
    // colocar no Carrinho
    setItemCar(newItem);
    // Recalcuar o novo valor do Carrinho
    let newTotalCar = newItem.reduce((total, valueItem) => {
      return (total = total + Number(valueItem.totalItem));
    }, 0);

    if (newTotalCar < vMinTaxa) newTotalCar = newTotalCar + Number(taxa);

    setTotalCar(newTotalCar);
    setIsloading(false);
  }

  async function checkout(formData) {
    // Criar a lista de items do pedido
    const items = itemCar.map((item) => {
      return {
        amount: item.amount,
        product_id: item.product_id,
        price: item.promotion ? item.pricePromotion : item.price,
        note: item.note || "",
        additionItem: item.listAdditional.map((item) => item.id).toString(),
      };
    });
    // Montar os dados
    const dataMyOrder = {
      deliveryType_id: selectedTypeDelivery.id,
      statusRequest_id: 1,
      payment_id: selectedTypePayment.id,
      coupon: "",
      note: formData.note || "",
      cash: formData.cash || "",
      address: formData.selectedAddress.address,
      number: formData.selectedAddress.number,
      neighborhood: formData.selectedAddress.neighborhood,
      city: formData.selectedAddress.city,
      uf: formData.selectedAddress.uf,
      timeDelivery: "",
      PointReferences: formData.selectedAddress.PointReferences || "",
      items: items,
    };

    await api
      .post("request/create", dataMyOrder)
      .then(() => {
        setItemCar([]);
        setselectedTypePayment({});
        setTotalCar(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <MyOrderContext.Provider
      value={{
        itemCar,
        taxaDelivery,
        setTaxaDelivery,
        totalCar,
        openClose,
        changeDB,
        setChangeDB,
        setOpenClose,
        typeDelivery,
        typePayments,
        setTypeDelivery,
        changeAmountCart,
        addItemCar,
        removeItemCar,
        isloading,
        selectedTypeDelivery,
        selectedTypePayment,
        setSelectedTypeDelivery,
        setselectedTypePayment,
        checkout,
      }}
    >
      {children}
    </MyOrderContext.Provider>
  );
};
