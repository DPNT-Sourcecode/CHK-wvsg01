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
    G: {
        price: 20,
    },
    H: {
        price: 10,
        offers: [
            { quantity: 10, type: 'discount', discount: 20 },
            { quantity: 5, type: 'discount', discount: 5 }
        ]
    },
    I: {
        price: 35,
    },
    J: {
        price: 60,
    },
    K: {
        price: 70,
        offers: [
            { quantity: 2, type: 'discount', discount: 20 }
        ]
    },
    L: {
        price: 90,
    },
    M: {
        price: 15,
    },
    N: {
        price: 40,
        offers: [
            { quantity: 3, type: 'free', onSku: 'M', discount: 1 }
        ]
    },
    O: {
        price: 10,
    },
    P: {
        price: 50,
        offers: [
            { quantity: 5, type: 'discount', discount: 50 },
        ]
    },
    Q: {
        price: 30,
        offers: [
            { quantity: 3, type: 'discount', discount: 10 },
        ]
    },
    R: {
        price: 50,
        offers: [
            { quantity: 3, type: 'free', onSku: 'Q', discount: 1 }
        ]
    },
    S: {
        price: 30,
        offers: [
            { quantity: 1, type: 'group', group: ['T', 'X', 'Y', 'Z'], required: 3, groupPrice: 45 }
        ]
    },
    T: {
        price: 20,
        offers: [
            { quantity: 1, type: 'group', group: ['S', 'X', 'Y', 'Z'], required: 3, groupPrice: 45 }
        ]
    },
    U: {
        price: 40,
        offers: [
            { quantity: 4, type: 'discount', discount: 40 }
        ]
    },
    V: {
        price: 50,
        offers: [
            { quantity: 3, type: 'discount', discount: 20 },
            { quantity: 2, type: 'discount', discount: 10 }
        ]
    },
    W: {
        price: 20,
    },
    X: {
        price: 90,
        offers: [
            { quantity: 1, type: 'group', group: ['S', 'T', 'Y', 'Z'], required: 3, groupPrice: 45 }
        ]
    },
    Y: {
        price: 10,
        offers: [
            { quantity: 1, type: 'group', group: ['S', 'T', 'X', 'Z'], required: 3, groupPrice: 45 }
        ]
    },
    Z: {
        price: 50,
        offers: [
            { quantity: 1, type: 'group', group: ['S', 'T', 'X', 'Y'], required: 3, groupPrice: 45 }
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
                // Apply discount
                if (offer.type === 'discount' && quantities[sku] >= offer.quantity) {
                    while (quantities[sku] >= offer.quantity) {
                        quantities[sku] -= offer.quantity
                        totalPrice += (price * offer.quantity) - offer.discount
                    }
                }

                // Apply group discount
                if (offer.type === 'group') {
                    let groupedProducts = [sku]

                    for (const groupSku of offer.group) {
                        if (quantities[groupSku] > 0) {
                            groupedProducts.push(groupSku)
                        }
                    }

                    console.log(groupedProducts, offer.required)
                    // if (groupedProducts.length >= offer.required) {
                    //     for (const product of groupedProducts) {
                    //         quantities[sku] -= 1
                    //     }
                    //     totalPrice += offer.groupPrice
                    // }
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


