const fetchDollarData = require("./fetchDollarData");

const buildDollarMessage = async () => {
  const dollarData = await fetchDollarData();
  return `
**Dólar Oficial** => $${dollarData.dolarOficial.venta} para la venta y ${dollarData.dolarOficial.compra} para la compra.\n
**Dólar Blue** => $${dollarData.dolarBlue.venta} para la venta y ${dollarData.dolarBlue.compra} para la compra.\n
**Dólar Bolsa** => $${dollarData.dolarBolsa.venta} para la venta y ${dollarData.dolarBolsa.compra} para la compra.\n
**Dólar Contado con Liqui** => $${dollarData.dolarLiqui.venta} para la venta y ${dollarData.dolarLiqui.compra} para la compra.\n
**Dólar Soja** => $${dollarData.dolarSoja.venta} para la venta y ${dollarData.dolarSoja.compra} para la compra.\n
**Dólar Turista** => $${dollarData.dolarTurista.venta} para la venta y ${dollarData.dolarTurista.compra} para la compra.\n
`;
};

module.exports = buildDollarMessage;
