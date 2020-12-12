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
    // Handle empty skus
    if (!skus || !skus.length) return -1
};
