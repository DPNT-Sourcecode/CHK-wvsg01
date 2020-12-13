'use strict'

const products = {
    A: {
        price: 50,
        offers: [
            { quantity: 5, type: 'discount', discount: 50 },
            { quantity: 3, type: 'discount', discount: 20 }
        ]
    },
    B: {
        price: 30,
        offers: [
            { quantity: 2, type: 'discount', discount: 15 }
        ]
    },
    C: {
        price: 20
    },
    D: {
        price: 15
    },
    E: {
        price: 40,
        offers: [
            { quantity: 2, type: 'free', onSku: 'B', discount: 1 }
        ]
    },
    F: {
        price: 10,
        offers: [
            { quantity: 3, type: 'discount', discount: 10 }
        ]
    },
}

const calculateQuantities = (skus) => {
    let quantities = {}

    if (skus === null || skus === undefined) return null
    if (!skus) return quantities

    for (const sku of skus.split('')) {
        if (!products[sku]) return null
        quantities[sku] = (quantities[sku] || 0) + 1
    }

    return quantities
}

const removeFreeItems = (quantities) => {
    const newQuantities = { ...quantities }

    let quantitiesTmp = { ...quantities }

    for (const sku of Object.keys(newQuantities)) {
        const { offers = [] } = products[sku]

        for (const offer of offers) {
            if (offer.type === 'free' && newQuantities[offer.onSku] && newQuantities[sku] >= offer.quantity) {
                while (quantitiesTmp[sku] >= offer.quantity) {
                    newQuantities[offer.onSku] -= offer.discount
                    quantitiesTmp[sku] -= offer.quantity
                }
            }
        }
    }

    return newQuantities
}

const calculateTotalWithDiscounts = (quantities) => {
    let totalPrice = 0

    for (const sku of Object.keys(quantities)) {
        const { offers = [], price } = products[sku]

        while (quantities[sku] !== 0) {
            // Apply items with discounts
            for (const offer of offers) {
                if (offer.type === 'discount' && quantities[sku] >= offer.quantity) {
                    while (quantities[sku] >= offer.quantity) {
                        quantities[sku] -= offer.quantity
                        totalPrice += (price * offer.quantity) - offer.discount
                    }
                }
            }

            // Apply items without discounts
            if (quantities[sku] > 0) {
                quantities[sku] -= 1
                totalPrice += price
            }
        }
    }

    return totalPrice
}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    let quantities = calculateQuantities(skus)

    if (!quantities) return -1

    quantities = removeFreeItems(quantities)

    return calculateTotalWithDiscounts(quantities, skus)
}