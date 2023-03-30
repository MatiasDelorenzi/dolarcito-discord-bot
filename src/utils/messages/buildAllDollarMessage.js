const fetchDollarData = require("../fetchDollarData");
const buildDollarTypeMessage = require("./buildDollarTypeMessage");

const buildAllDollarMessage = async () => {
  const {
    dolarBlue,
    dolarOficial,
    dolarLiqui,
    dolarSoja,
    dolarTurista,
    dolarBolsa
  } = await fetchDollarData();
  return `
${buildDollarTypeMessage(dolarBlue.nombre, dolarBlue.compra, dolarBlue.venta)}\n
${buildDollarTypeMessage(dolarOficial.nombre, dolarOficial.compra, dolarOficial.venta)}\n
${buildDollarTypeMessage(dolarLiqui.nombre, dolarLiqui.compra, dolarLiqui.venta)}\n
${buildDollarTypeMessage(dolarSoja.nombre, dolarSoja.compra, dolarSoja.venta)}\n
${buildDollarTypeMessage(dolarTurista.nombre, dolarTurista.compra, dolarTurista.venta)}\n
${buildDollarTypeMessage(dolarBolsa.nombre, dolarBolsa.compra, dolarBolsa.venta)}
`;
};

module.exports = buildAllDollarMessage;
