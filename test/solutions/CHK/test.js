var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

const invalidRequest1 = null
const invalidRequest2 = 'INVALID'

const validRequest1 = 'ABCD'
const validRequest2 = 'AAABBCD'

describe('Checkout: invalid requests', function () {
  it('Should return -1 if input is invalid', function () {
    assert.equal(checkout(invalidRequest1), -1);
  });

  it('Should return -1 if input is invalid', function () {
    assert.equal(checkout(invalidRequest2), -1);
  });
});

describe('Checkout: valid requests', function () {
  it('Should return 115', function () {
    assert.equal(checkout(validRequest1), 115);
  });

  // it('Should return 210', function () {
  //   assert.equal(checkout(validRequest2), 210);
  // });

  it('Should return 210', function () {
    assert.equal(checkout(validRequest2), 210);
  });
});