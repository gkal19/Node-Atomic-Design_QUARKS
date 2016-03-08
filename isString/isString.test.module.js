'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];

const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};

describe('isString', () => {
  describe('é String',  () => test(valuesTRUE, true));
  describe('não é String',  () => test(valuesFALSE, false));
});