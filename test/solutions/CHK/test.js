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
  it('Should return 110', function () {
    assert.equal(checkout('BBEE'), 110)
  })

  it('Should return 80', function () {
    assert.equal(checkout('EE'), 80)
  })

  it('Should return 160', function () {
    assert.equal(checkout('EEEEBB'), 160)
  })

  it('Should return 160', function () {
    assert.equal(checkout('BEBEEE'), 160)
  })

  it('Should return 280', function () {
    assert.equal(checkout('ABCDEABCDE'), 280)
  })
})
