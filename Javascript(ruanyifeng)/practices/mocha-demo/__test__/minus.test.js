var minus = require('../minus');
var expect = require('chai').expect;

describe('test for minus function', () => {
    it('2 substract 1 should equal to 1', () => {
        expect(minus({ a: 2, b: 1})).to.be.equal(1);
    })
})