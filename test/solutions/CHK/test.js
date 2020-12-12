var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

const request1 = 'ABCD'
const request2 = 'AAABBCD'

describe('Checkout', function () {
  it('Should return -1 if input is invalid', function () {
    assert.equal(checkout(null), -1);
  });

  // it('Should return 0 if input is empty', function () {
  //   assert.equal(checkout(''), 0);
  // });

  // it('Should return the price without promotions', function () {
  //   assert.equal(checkout(request1), 115);
  // });
});
