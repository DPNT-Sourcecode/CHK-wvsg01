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
    },
    T: {
        price: 20,
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
    },
    Y: {
        price: 10,
    },
    Z: {
        price: 50,
    },
}

/*
| K    | 70    | 2K for 120                      |
| L    | 90    |                                 |
| M    | 15    |                                 |
| N    | 40    | 3N get one M free               |
| O    | 10    |                                 |
| P    | 50    | 5P for 200                      |
| Q    | 30    | 3Q for 80                       |
| R    | 50    | 3R get one Q free               |
| S    | 20    | buy any 3 of (S,T,X,Y,Z) for 45 |
| T    | 20    | buy any 3 of (S,T,X,Y,Z) for 45 |
| U    | 40    | 3U get one U free               |
| V    | 50    | 2V for 90, 3V for 130           |
| W    | 20    |                                 |
| X    | 17    | buy any 3 of (S,T,X,Y,Z) for 45 |
| Y    | 20    | buy any 3 of (S,T,X,Y,Z) for 45 |
| Z    | 21    | buy any 3 of (S,T,X,Y,Z) for 45 |
+------+-------+---------------------------------+
*/

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
