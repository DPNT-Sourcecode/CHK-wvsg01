'use strict'

const products = {
    A: {
        price: 50,
        offers: [
            { quantity: 5, discount: 50, onSku: 'A' },
            { quantity: 3, discount: 20, onSku: 'A' }
        ]
    },
    B: {
        price: 30,
        offers: [
            { quantity: 2, discount: 15, onSku: 'B' }
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
            { quantity: 2, discount: 30, onSku: 'B' }
        ]
    },
}

const calculateTotalAndQuantity = (skuArray) => {
    let totalPrice = 0
    const quantities = {}

    for (const sku of skuArray) {
        const product = products[sku]

        if (!product) {
            totalPrice = -1
            break
        }

        if (!quantities[sku]) quantities[sku] = 1
        else quantities[sku] += 1

        totalPrice += product.price
    }

    return {
        totalPrice,
        quantities,
    }
}

const applySpecialOffers = (totalPrice, quantities) => {
    const skus = Object.keys(quantities)

    let newTotalPrice = totalPrice

    for (const sku of skus) {
        const product = products[sku]

        if (product.offers) {
            for (const offer of product.offers) {
                if (skus.includes(offer.onSku)) {
                    while (quantities[sku] >= offer.quantity) {
                        newTotalPrice -= offer.discount
                        quantities[sku] -= offer.quantity
                    }
                }
            }
        }
    }

    return newTotalPrice
}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    if (skus === null || skus === undefined) return -1

    const { totalPrice, quantities } = calculateTotalAndQuantity(skus.split(''))

    if (totalPrice < 0) return -1

    const discountedPrice = applySpecialOffers(totalPrice, quantities)

    return discountedPrice
}