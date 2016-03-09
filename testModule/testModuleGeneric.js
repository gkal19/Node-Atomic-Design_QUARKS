'use strict';

const expect = require('chai').expect;

const testQuarkTo = require('./testAtomicQuarkTo');
const testQuarkIs = require('./testAtomicQuarkIs');


const testQuarkENUM = (testName, element, list, valueToTest) => {
  let validated = require('./../'+testName+'/'+testName)(element, list);
  expect(validated).to.equal(valueToTest);
};

module.exports = (testName, describes) => {
  let test = (values, valueToTest) => {
    console.log('values aqui', values);
    if(testName.indexOf('to') > -1) testQuarkTo.test(testName, values, valueToTest, describes);
    else testQuarkIs.test(testName, values, valueToTest, describes);
  };
  if(describes[0].list) {
    const list = describes.splice(0,1)[0].list;
    test = (values, valueToTest) => {
      values.forEach( (element) => {
        it('testando: '+element,  () => {
          testQuarkENUM(testName, element, list, valueToTest);
        });
      });
    };
  }

  describe(testName, () => {
    describes.forEach( (element, index) => {
      if(element.type) {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      else {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      if(element.list) return true;
    });
  });
};
