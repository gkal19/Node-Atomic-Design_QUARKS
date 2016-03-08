'use strict';

const assert = require('assert');

const emailValido = 'eliel.floyd@bol.com.br';
const emailValido2 = 'xxe2@sol.com';
const emailInvalido = '';
const emailInvalido2 = '21';
const emailINvalido3 = '@dda.com';
const emailINvalido4 = '333@.com';

assert.equal(true,require('./isEmail')(emailValido));
assert.equal(true,require('./isEmail')(emailValido2));
assert.equal(false,require('./isEmail')(emailInvalido));
assert.equal(false,require('./isEmail')(emailInvalido2));
assert.equal(false,require('./isEmail')(emailINvalido3));
assert.equal(false,require('./isEmail')(emailINvalido4));

console.log(emailValido + ' é um email?', require('./isEmail')(emailValido));
console.log(emailValido2 + ' é um email?', require('./isEmail')(emailValido2));
console.log(emailInvalido + ' é um email?', require('./isEmail')(emailInvalido));
console.log(emailInvalido2 + ' é um email?', require('./isEmail')(emailInvalido2));
console.log(emailINvalido3 + ' é um email?', require('./isEmail')(emailINvalido3));
console.log(emailINvalido4 + ' é um email?', require('./isEmail')(emailINvalido4));