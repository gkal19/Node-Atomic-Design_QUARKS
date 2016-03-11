'use strict';

module.exports = (testName) => {
  let test = null;
  const testTypes = require('./testTypesFactory');
  let findTest = (element) => {
    let regex = new RegExp(element, 'i');
    if(!!testName.match(regex)){
      test = require('./testQuark'+element);
    }
  };

  testTypes.forEach(findTest);
  return test;
}