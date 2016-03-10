'use strict';

const expect = require('chai').expect;

const testQuarkTo = require('./testAtomicQuarkTo');
const testQuarkIs = require('./testAtomicQuarkIs');


// const testQuarkENUM = (testName, element, list, valueToTest) => {
//   let validated = require('./../'+testName+'/'+testName)(element, list);
//   expect(validated).to.equal(valueToTest);
// };

const testQuarkIsIn = (testName, element, list, valueToTest) => {
  it('testando: '+element,  () => {
    let validated = require('./../'+testName+'/'+testName)(element, list);
    expect(validated).to.equal(valueToTest);
  });
};

// Definimos os tipos de testes
// SEMPRE dos mais específicos para os mais básicos
const typesTest = ['isIn', 'is', 'to'];

const isTestTo = (typeTest) => {
  return typeTest === 'to';
};
const isTestIs = (typeTest) => {
  return typeTest === 'is';
};
const isTestIsIn = (typeTest) => {
  return typeTest === 'isIn';
};

module.exports = (testName, describes) => {

  const defineType = (element) => {
    return (testName.indexOf(element) > -1)
  }
  const defineTypeTest = (testName, types) => {
    return types.filter(defineType);
  };

  // Pego apenas o primeiro pois ele eh mais específico
  // Ja que com isIN ele acha tanto isIn como is
  // Sendo esse o retorno [ 'isIn', 'is' ]
  let typeTest = defineTypeTest(testName, typesTest)[0];
  let test = (values, valueToTest) => {
    // console.log('values aqui', values);
    if(isTestTo(typeTest)) testQuarkTo.test(testName, values, valueToTest, describes);
    else testQuarkIs.test(testName, values, valueToTest, describes);
  };

  // Corrigir esse teste
  if(isTestIsIn(typeTest)) {
    if(describes[0].list) {
      const list = describes.splice(0,1)[0].list;
      test = (values, valueToTest) => {
        values.forEach( (element) => {
          testQuarkIsIn(testName, element, list, valueToTest);
        });
      };
    }
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
