const buildDollarTypeMessage = (dollarName, buyValue, sellValue) => {
    return `💵  ${dollarName}
            💰 Compra: $ ${buyValue}
            💰 Venta: $ ${sellValue}`
}

module.exports = buildDollarTypeMessage