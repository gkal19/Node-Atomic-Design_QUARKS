

const assert = require('assert');

const cpferrado = '05044099820';
const cpfEmBranco = '';
const cpfCerto = '05068287512';


assert.equal(false,require('./isCpf')(cpferrado));
assert.equal(false,require('./isCpf')(cpfEmBranco));
assert.equal(true,require('./isCpf')(cpfCerto));

console.log(cpferrado + ' é um cpf?', require('./isCpf')(cpferrado));
console.log(cpfEmBranco + ' é um cpf?', require('./isCpf')(cpfEmBranco));
console.log(cpfCerto + ' é um cpf?', require('./isCpf')(cpfCerto));
