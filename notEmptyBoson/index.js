'use strict';

// const assert = require('assert');
const notEmpty = require('./notEmpty');

const valueTRUE = 'suissa';
const valueFALSE = '';

console.log(valueTRUE + ' notEmpty?', notEmpty.validate('String', valueTRUE));
console.log(valueFALSE + ' notEmpty?', notEmpty.validate('String', valueFALSE));

// assert.ok(value, message)