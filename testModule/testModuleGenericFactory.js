'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const testTypes = require('./config/testTypesFactory');
  let testQuark = null;

  let findTest = (element) => {
    let regex = new RegExp(element, 'i');
    if(!!testName.match(regex)){
      testQuark = require('./config/testQuark'+element);
      return element;
    }
  };

  let testQuarkArr = testTypes.filter(findTest);
  let test = (values, valueToTest) => {
    if(isQuarkTo) testQuark(values, valueToTest, testName, describes);
    else testQuark(values, valueToTest, testName);
  };
  if(describes[0].list) {
    const list = describes.splice(0,1)[0].list;
    test = (values, valueToTest) => {
      testQuark(values, valueToTest, list, testName);
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
