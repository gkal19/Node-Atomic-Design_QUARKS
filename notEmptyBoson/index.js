'use strict';

// const assert = require('assert');
const validations = ['notEmptyString', 'notEmptyBASE'];
const notEmpty = require('./boson')(validations);
// console.log('quarks antes', notEmpty.quarks.length);

// notEmpty.quarks.forEach( function(element, index) {
//   console.log('quarks', element);
// });

const valueTRUE = 'suissa';
const valueFALSE = null;

console.log(valueTRUE + ' notEmpty?', notEmpty.validate(valueTRUE));
console.log(valueFALSE + ' notEmpty?', notEmpty.validate(valueFALSE));

// assert.ok(value, message)