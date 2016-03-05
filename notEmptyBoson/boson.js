'use strict';

module.exports = (validations) => {
  let quarks = [];
  validations.forEach( (element, index) => {
    quarks.push(require('./'+element))
  });
  return {
    quarks,
    validate: (value) => {
      console.log('VALIDEEE', value)
      quarks.forEach( (quark) => {
        console.log('Quark: ', quark)
        quark.validate(value);
      });
      return true;
    }
  };
};