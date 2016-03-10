'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const itQuarkIs = require('./config/itQuarkIs');
  const testQuarkIs = (values, valueToTest) => {
    values.forEach((element, index) => {
      itQuarkIs(element, index, valueToTest, testName)
    });
  };

  const itQuarkTo = require('./config/itQuarkTo');
  const testQuarkTo = (values, valueToTest) => {
    let valuesExpectedIndex = 0;
    if(!valueToTest) valuesExpectedIndex = 1;
    let valueConverted = 0;
    values.forEach((element, index) => {
      valueConverted = describes[valuesExpectedIndex].valuesExpected[index];
      itQuarkTo(element, index, valueToTest, valueConverted, valuesExpectedIndex, testName, describes)
    });
  };

  let test = (values, valueToTest) => {
    let isQuarkTo = (testName.indexOf('to') > -1);

    if(isQuarkTo) testQuarkTo(values, valueToTest);
    else testQuarkIs(values, valueToTest);
  };

  const itQuarkIsIn = require('./config/itQuarkIsIn');
  const testQuarkIsIn = (values, valueToTest, list) => {
    values.forEach( (element, index) => {
      itQuarkIsIn(element, index, list, valueToTest, testName);
    });
  };

  if(describes[0].list) {
    const list = describes.splice(0,1)[0].list;
    test = (values, valueToTest) => {
      testQuarkIsIn(values, valueToTest, list);
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
        console.log('aqui começa')
        describe(element.message,  () => {
          console.log('element.values', element.values)
          console.log('element.type', element.type)
          test(element.values, element.type);
        });
      }
      if(element.list) return true;
    });
  });
};
