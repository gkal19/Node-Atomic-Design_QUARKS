'use strict';

// const assert = require('assert');
const notEmpty = require('./notEmpty');

const valueTRUE = 'suissa';
const valueFALSE = null;

console.log(valueTRUE + ' notEmpty?', notEmpty.validate(valueTRUE));
console.log(valueFALSE + ' notEmpty?', notEmpty.validate(valueFALSE));

// assert.ok(value, message)