var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert')
const checkout = require('../../../lib/solutions/CHK/checkout')

describe('Checkout: invalid requests', function () {
  it('Should return -1 if input is null', function () {
    assert.equal(checkout(null), -1)
  })

  it('Should return -1 if input is invalid', function () {
    assert.equal(checkout('INVALID'), -1)
  })
})

describe('Checkout: valid requests', function () {
  it('Should return 115', function () {
    assert.equal(checkout('ABCD'), 115)
  })

  it('Should return 130', function () {
    assert.equal(checkout('AAA'), 130)
  })

  it('Should return 210', function () {
    assert.equal(checkout('AAABBCD'), 210)
  })

  it('Should return 0 if input is empty', function () {
    assert.equal(checkout(''), 0)
  })
})