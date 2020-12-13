var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert')
const checkout = require('../../../lib/solutions/CHK/checkout')

describe('Checkout: invalid requests', function () {
  it('Should return -1 if input is null', function () {
    assert.equal(checkout(null), -1)
  })
})

describe('Checkout: valid requests', function () {
  it('Should return 0', function () {
    assert.equal(checkout(''), 0)
  })

  it('Should return 180', function () {
    assert.equal(checkout('AAAA'), 180)
  })

  it('Should return 200', function () {
    assert.equal(checkout('AAAAA'), 200)
  })

  it('Should return 245', function () {
    assert.equal(checkout('AAAAABB'), 245)
  })

  it('Should return 400', function () {
    assert.equal(checkout('AAAAAAAAAA'), 400)
  })

  it('Should return 330', function () {
    assert.equal(checkout('AAAAAAAA'), 330)
  })

  it('Should return 280', function () {
    assert.equal(checkout('ABCDEABCDE'), 280)
  })

  it('Should return 665', function () {
    assert.equal(checkout('ABCDECBAABCABBAAAEEAA'), 665)
  })

  it('Should return 455', function () {
    assert.equal(checkout('AAAAAEEBAAABB'), 455)
  })

  it('Should return 665', function () {
    assert.equal(checkout('ABCDECBAABCABBAAAEEAA'), 665)
  })

  it('Should return 160', function () {
    assert.equal(checkout('EEEEBB'), 160)
  })

  it('Should return 160', function () {
    assert.equal(checkout('BEBEEE'), 160)
  })

  it('Should return 230', function () {
    assert.equal(checkout('ABDBEBDBC'), 230)
  })

  it('Should return 450', function () {
    assert.equal(checkout('AAAAAAAAAAA'), 450)
  })

  it('Should return 80', function () {
    assert.equal(checkout('EE'), 80)
  })

  it('Should return 20', function () {
    assert.equal(checkout('FF'), 20)
  })

  it('Should return 20', function () {
    assert.equal(checkout('FFF'), 20)
  })

  it('Should return 220', function () {
    assert.equal(checkout('AAAAAFFF'), 220)
  })

  it('Should return 120', function () {
    assert.equal(checkout('UUU'), 120)
  })

  it('Should return 120', function () {
    assert.equal(checkout('UUU'), 120)
  })

  it('Should return 45', function () {
    assert.equal(checkout('SXZ'), 45)
  })

  it('Should return 45', function () {
    assert.equal(checkout('SSS'), 45)
  })

  it('Should return 65', function () {
    assert.equal(checkout('SSSZ'), 65)
  })

  it('Should return 65', function () {
    assert.equal(checkout('ZZZS'), 65)
  })

  it('Should return 62', function () {
    assert.equal(checkout('STXZ'), 62)
  })
})
