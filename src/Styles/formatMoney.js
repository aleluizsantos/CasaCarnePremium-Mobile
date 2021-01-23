const formatMoney = (_number) => {
    const numberFormated = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        }).format(_number)
    return numberFormated;
}

export default formatMoney;