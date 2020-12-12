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
  it('Should return 200', function () {
    assert.equal(checkout('AAAAA'), 200)
  })

  it('Should return 330', function () {
    assert.equal(checkout('AAAAAAAA'), 330)
  })

  it('Should return 245', function () {
    assert.equal(checkout('AAAAABB'), 245)
  })

  it('Should return 320', function () {
    assert.equal(checkout('AAAAABBCDE'), 320)
  })

  it('Should return 320', function () {
    assert.equal(checkout('AAAAABBCDEE'), 320)
  })
})

