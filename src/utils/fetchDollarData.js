const axios = require("axios");

const API_URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

const fetchDollarData = async () => {
  let dollarData = {
    dolarOficial: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar Oficial",
    },
    dolarBlue: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar Blue",
    },
    dolarBolsa: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar Bolsa",
    },
    dolarLiqui: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar Contado con Liqui",
    },
    dolarSoja: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar Soja",
    },
    dolarTurista: {
      compra: "-1",
      venta: "-1",
      nombre: "Dolar turista",
    },
  };

  const { data } = await axios.get(API_URL);

  for (let i = 0; i < data.length; i++) {
    const dollar = data[i].casa;
    switch (dollar.nombre) {
      case "Dolar Oficial":
        dollarData.dolarOficial.compra = dollar.compra;
        dollarData.dolarOficial.venta = dollar.venta;
        break;
      case "Dolar Blue":
        dollarData.dolarBlue.compra = dollar.compra;
        dollarData.dolarBlue.venta = dollar.venta;
        break;
      case "Dolar Soja":
        dollarData.dolarSoja.compra = dollar.compra;
        dollarData.dolarSoja.venta = dollar.venta;
        break;
      case "Dolar Contado con Liqui":
        dollarData.dolarLiqui.compra = dollar.compra;
        dollarData.dolarLiqui.venta = dollar.venta;
        break;
      case "Dolar Bolsa":
        dollarData.dolarBolsa.compra = dollar.compra;
        dollarData.dolarBolsa.venta = dollar.venta;
        break;
      case "Dolar turista":
        dollarData.dolarTurista.compra = dollar.compra;
        dollarData.dolarTurista.venta = dollar.venta;
        break;
      default:
        break;
    }
  }
  return dollarData;
};

module.exports = fetchDollarData;
