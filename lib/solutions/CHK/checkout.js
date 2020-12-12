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

const calculateTotalAndQuantities = (skuArray) => {
    let totalPrice = 0
    const quantities = {}

    for (const sku of skuArray) {
        const product = products[sku]

        if (!product) {
            totalPrice = -1
            break
        }

        quantities[sku] = (quantities[sku] || 0) + 1

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

    const discounts = {}

    for (const sku of skus) {
        const product = products[sku]

        if (product.offers) {
            let totalSkuDiscount = 0

            for (const offer of product.offers) {
                let offerDiscount = 0

                if (skus.includes(offer.onSku)) {
                    while (quantities[sku] >= offer.quantity) {
                        quantities[sku] -= offer.quantity
                        offerDiscount += offer.discount
                    }
                }

                totalSkuDiscount += offerDiscount
            }

            console.log(offer.onSku)

            if (!discounts[offer.onSku] || discounts[offer.onSku] < totalSkuDiscount) {
                discounts[offer.onSku] = totalSkuDiscount
            }
        }

        // newTotalPrice -= discounts[sku]
    }

    console.log(discounts)

    return newTotalPrice
}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    if (skus === null || skus === undefined) return -1

    const { totalPrice, quantities } = calculateTotalAndQuantities(skus.split(''))

    if (totalPrice < 0) return -1

    const discountedPrice = applySpecialOffers(totalPrice, quantities)

    return discountedPrice
}