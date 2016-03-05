'use strict';

const assert = require('assert');

const valueFALSE = 'Suissera';
const valueTRUE = '';

assert.equal(true, require('./isEmptyString')(valueTRUE));
assert.equal(false, require('./isEmptyString')(valueFALSE));

console.log(valueTRUE + ' é uma String vazia?', require('./isEmptyString')(valueTRUE));
console.log(valueFALSE + ' é uma String vazia?', require('./isEmptyString')(valueFALSE));