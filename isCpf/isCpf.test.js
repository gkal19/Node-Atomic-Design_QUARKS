'use strict';

const assert = require('assert');

const cpfErrado = '05044099820';
const cpfEmBranco = '';
const cpfCerto = '05068287512';
const cpfErrado2 = 'teste';
const cpfDoido = '@312312';


assert.equal(false,require('./isCpf')(cpfErrado));
assert.equal(false,require('./isCpf')(cpfEmBranco));
assert.equal(true,require('./isCpf')(cpfCerto));

console.log('erros de cpf:');
console.log(cpfErrado + ' é um cpf?', require('./isCpf')(cpfErrado));
console.log(cpfEmBranco + ' é um cpf?', require('./isCpf')(cpfEmBranco));
console.log(cpfErrado2 + 'é um cpf?' , require('./isCpf')(cpfErrado2));
console.log(cpfDoido + 'é um cpf?', require('./isCpf')(cpfDoido));

console.log('cpfs certos');
console.log(cpfCerto + ' é um cpf?', require('./isCpf')(cpfCerto));
