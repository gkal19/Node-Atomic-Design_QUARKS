'use strict';

// const assert = require('assert');
const notEmpty = require('./notEmptyString');
// console.log('quarks antes', notEmpty.quarks.length);

// notEmpty.quarks.forEach( function(element, index) {
//   console.log('quarks', element);
// });

const valueTRUE = 'suissa';
const valueFALSE = null;
const valueFALSE2 = '';


console.log(valueTRUE + ' não é vazio?', notEmpty.validate(valueTRUE));
console.log(valueFALSE + ' não é vazio?', notEmpty.validate(valueFALSE));
console.log(valueFALSE2 + ' não é vazio?', notEmpty.validate(valueFALSE2));

// assert.ok(value, message)