import axios from "axios";

const API_URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

const fetchDollarData = async () => {
  let dollarData = {
    dolarOficial: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.OFICIAL,
    },
    dolarBlue: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.BLUE,
    },
    dolarBolsa: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.BOLSA,
    },
    dolarLiqui: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.LIQUI,
    },
    dolarSoja: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.SOJA,
    },
    dolarTurista: {
      compra: "-1",
      venta: "-1",
      nombre: DollarType.TURISTA,
    },
  };
  const { data } = await axios.get(API_URL);
  for (let i = 0; i < data.length; i++) {
    const dollar = data[i].casa;
    switch (dollar.nombre) {
      case DollarType.OFICIAL:
        dollarData.dolarOficial.compra = dollar.compra;
        dollarData.dolarOficial.venta = dollar.venta;
        break;
      case DollarType.BLUE:
        dollarData.dolarBlue.compra = dollar.compra;
        dollarData.dolarBlue.venta = dollar.venta;
        break;
      case DollarType.SOJA:
        dollarData.dolarSoja.compra = dollar.compra;
        dollarData.dolarSoja.venta = dollar.venta;
        break;
      case DollarType.LIQUI:
        dollarData.dolarLiqui.compra = dollar.compra;
        dollarData.dolarLiqui.venta = dollar.venta;
        break;
      case DollarType.BOLSA:
        dollarData.dolarBolsa.compra = dollar.compra;
        dollarData.dolarBolsa.venta = dollar.venta;
        break;
      case DollarType.TURISTA:
        dollarData.dolarTurista.compra = dollar.compra;
        dollarData.dolarTurista.venta = dollar.venta;
        break;
      default:
        break;
    }
  }
  return dollarData;
};

fetchDollarData();
