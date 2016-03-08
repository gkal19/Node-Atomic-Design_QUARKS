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
const describes = [
  {type: true, message: 'é String', test: test}
, {type: false, message: 'não é String', test: test}
]

describe('isString', () => {
  describes.forEach( (element, index) => {
    if(element.type) {
      describe(element.message,  () => {
        test(valuesTRUE, element.type);
      });
    }
    else {
      describe(element.message,  () => {
        test(valuesFALSE, element.type);
      });
    }
  });
});