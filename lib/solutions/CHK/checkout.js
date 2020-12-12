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

    // Loop over skus
    for (const sku of skus.split('')) {
        const product = products[sku]

        // If an item is invalid return -1
        if (!product) {
            totalPrice = -1
            break
        }

        // Save sku to be check for special offers
        if (!productQuantities[sku]) productQuantities[sku] = 1
        else productQuantities[sku] += 1

        // If the product has an offer, handle it
        const { price, offer } = product
        if (offer && productQuantities[sku] >= offer.quantity) {
            const amountToDiscount = price * (offer.quantity - 1)
            totalPrice -= amountToDiscount
            totalPrice += offer.price
            productQuantities[sku] = 0
        }
        else {
            totalPrice += price
        }
    }

    return totalPrice
};


