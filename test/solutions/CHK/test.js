var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Hello challenge: return param', function () {
  it('Should return', function () {
    assert.equal(hello('John'), 'Hello, John!');
  });
});