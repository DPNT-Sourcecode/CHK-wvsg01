'use strict'

const products = {
    A: {
        price: 50,
        offers: [
            { quantity: 5, onSku: 'A', type: 'discount', discount: 50 },
            { quantity: 3, onSku: 'A', type: 'discount', discount: 20 }
        ]
    },
    B: {
        price: 30,
        offers: [
            { quantity: 2, onSku: 'B', type: 'discount', discount: 15 }
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
            { quantity: 2, onSku: 'B', type: 'free', discount: 1 }
        ]
    },
}

// const calculateTotalAndQuantities = (skuArray) => {
//     let totalPrice = 0
//     const quantities = {}

//     for (const sku of skuArray) {
//         const product = products[sku]

//         if (!product) {
//             totalPrice = -1
//             break
//         }

//         quantities[sku] = (quantities[sku] || 0) + 1

//         totalPrice += product.price
//     }

//     return {
//         totalPrice,
//         quantities,
//     }
// }

// const applySpecialOffers = (totalPrice, quantities) => {
//     const discounts = {}
//     const skuQuantities = Object.keys(quantities)

//     let newTotalPrice = totalPrice

//     for (const sku of skuQuantities) {
//         const product = products[sku]

//         if (product.offers) {
//             let offerDiscount = {}

//             for (const offer of product.offers) {
//                 let discount = 0

//                 // For each offer, if SKU exists get discount amount
//                 if (skuQuantities.includes(offer.onSku)) {
//                     while (quantities[sku] >= offer.quantity) {
//                         quantities[sku] -= offer.quantity
//                         discount += offer.discount
//                     }

//                     // Increment offer discount amount for the sku
//                     offerDiscount = { onSku: offer.onSku, discount: (offerDiscount.discount || 0) + discount }
//                 }
//             }

//             // Only add if it's the biggest discount
//             if (offerDiscount.discount && (!discounts[offerDiscount.onSku] || discounts[offerDiscount.onSku] < offerDiscount.discount)) {
//                 discounts[offerDiscount.onSku] = (discounts[offerDiscount.onSku] || 0) + offerDiscount.discount
//             }
//         }
//     }

//     // Calculate discount total to apply
//     const discountArray = Object.values(discounts)
//     const totalDiscount = discountArray.length ? discountArray.reduce((a, b) => a + b) : 0

//     return newTotalPrice - totalDiscount
// }

const calculateQuantities = (skus) => {
    let quantities = {}

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
            if (offer.type === 'free' && newQuantities[sku] >= offer.quantity) {
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

}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    let quantities = calculateQuantities(skus)

    if (!quantities) return -1

    quantities = removeFreeItems(quantities)

    return calculateTotalWithDiscounts(quantities)
}

