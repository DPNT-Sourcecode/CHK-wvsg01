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
  it('Should return 160', function () {
    assert.equal(checkout('EEEEBB'), 160)
  })

  // it('Should return 110', function () {
  //   assert.equal(checkout('BBEE'), 110)
  // })

  // it('Should return 80', function () {
  //   assert.equal(checkout('EE'), 80)
  // })

  // it('Should return 160', function () {
  //   assert.equal(checkout('EEEEBB'), 160)
  // })

  // it('Should return 160', function () {
  //   assert.equal(checkout('BEBEEE'), 160)
  // })

  // it('Should return 280', function () {
  //   assert.equal(checkout('ABCDEABCDE'), 280)
  // })

  // it('Should return 455', function () {
  //   assert.equal(checkout('AAAAAEEBAAABB'), 455)
  // })

  // it('Should return 665', function () {
  //   assert.equal(checkout('ABCDECBAABCABBAAAEEAA'), 665)
  // })
})


/*

Our price table and offers:
+------+-------+------------------------+
| Item | Price | Special offers         |
+------+-------+------------------------+
| A    | 50    | 3A for 130, 5A for 200 |
| B    | 30    | 2B for 45              |
| C    | 20    |                        |
| D    | 15    |                        |
| E    | 40    | 2E get one B free      |
+------+-------+------------------------+

*/


  // - { "method": "checkout", "params": ["AAAAAEEBAAABB"], "id": "CHK_R2_040" }, expected: 455, got: 500
  //   - { "method": "checkout", "params": ["ABCDECBAABCABBAAAEEAA"], "id": "CHK_R2_001" }, expected: 665, got: 725
