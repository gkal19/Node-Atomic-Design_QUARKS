'use strict';

const assert = require('assert');

const cnpjInvalido = '121323';
const cnpjNumberErr = 40201011222;
const cnpjNumberOk = '60422522000103'
const cnpjValido = '32961969000115';

assert.equal(true,require('./isCnpj')(cnpjValido));
assert.equal(true,require('./isCnpj')(cnpjNumberOk));
assert.equal(false,require('./isCnpj')(cnpjInvalido));
assert.equal(false,require('./isCnpj')(cnpjNumberErr));


console.log(cnpjValido + ' é um cnpj?', require('./isCnpj')(cnpjValido));
console.log(cnpjNumberOk + ' é um cnpj?', require('./isCnpj')(cnpjNumberOk));
console.log(cnpjNumberErr + ' é um cnpj?', require('./isCnpj')(cnpjNumberErr));
console.log(cnpjInvalido + ' é um cnpj?', require('./isCnpj')(cnpjInvalido));