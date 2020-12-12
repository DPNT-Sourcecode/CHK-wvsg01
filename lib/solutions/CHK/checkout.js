'use strict';

// Define products
const products = {
    A: { price: 50, offer: { quantity: 3, price: 130 } },
    B: { price: 30, offer: { quantity: 2, price: 45 } },
    C: { price: 20 },
    D: { price: 15 },
}

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    // Handle null or undefined skus
    if (!skus) return -1

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

        // Handle special offers
        if (product.offer && productQuantities[sku] >= product.offer.quantity) {
            const amountToDiscount = product.price * (product.offer.quantity - 1)
            totalPrice -= amountToDiscount
            totalPrice += product.offer.price
            productQuantities[sku] = 0
        }
        else {
            totalPrice += product.price
        }
    }

    return totalPrice
};