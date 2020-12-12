'use strict';

// Define products
const products = {
    A: {
        price: 50,
        offers: [
            { quantity: 3, discount: 20 },
            { quantity: 5, discount: 50 }
        ]
    },
    B: {
        price: 30,
        offers: [
            { quantity: 2, discount: 15 }
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
            { quantity: 2, discount: 30 }
        ]
    },
}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Handle null or undefined skus
    if (skus === null || skus === undefined) return -1

    const productQuantities = {}
    let totalPrice = 0

    for (const sku of skus.split('')) {
        const product = products[sku]

        // Product does not exist
        if (!product) {
            totalPrice = -1
            break
        }

        // Save sku new quantity
        if (!productQuantities[sku]) productQuantities[sku] = 1
        else productQuantities[sku] += 1

        totalPrice += product.price
    }

    if (totalPrice < 0) return -1

    // Handle special offers

    // Loop over product quantities
    // If has offer apply best promotion
    // Update price

    // if (product.offer && productQuantities[sku] >= product.offer.quantity) {
    //     const amountToDiscount = product.price * (product.offer.quantity - 1)
    //     totalPrice -= amountToDiscount
    //     totalPrice += product.offer.price
    //     productQuantities[sku] = 0
    // }
    // else {
    //     totalPrice += product.price
    // }

    return totalPrice
};
