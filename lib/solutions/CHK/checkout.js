'use strict';

/*
    +------+-------+----------------+
    | Item | Price | Special offers |
    +------+-------+----------------+
    | A    | 50    | 3A for 130     |
    | B    | 30    | 2B for 45      |
    | C    | 20    |                |
    | D    | 15    |                |
    +------+-------+----------------+

    For any illegal input return -1

    In order to complete the round you need to implement the following method:
        checkout(String) -> Integer

    Where:
    - param[0] = a String containing the SKUs of all the products in the basket
    - @return = an Integer representing the total checkout value of the items 
*/

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {

    // Handle null or undefined skus
    if (!skus) return -1

    // Define products
    const products = {
        A: { price: 50, offer: { quantity: 3, price: 130 } },
        B: { price: 30, offer: { quantity: 2, price: 45 } },
        C: { price: 20 },
        D: { price: 15 },
    }

    // Create object to save quantity of item purchased
    const productQuantities = {}

    // Loop over skus
    let totalPrice = 0
    for (const sku of skus.split('')) {
        const product = products[sku]

        // If an item is invalid return -1
        if (!product) {
            totalPrice = -1
            break
        }

        // Save sku to be check for special offers
        if (!productQuantities[sku]) {
            productQuantities[sku] = 1
        }
        else {
            productQuantities[sku] += 1
        }

        // If the product has an offer, handle it
        if (product.offer && productQuantities[sku] >= product.offer.quantity) {
            const amountDifference = (product.price * product.offer.quantity) - product.offer.price

            console.log(totalPrice, amountDifference)

            totalPrice += amountDifference
            productQuantities[sku] = 0
        }
        else {
            totalPrice += product.price
        }
    }

    return totalPrice
};

