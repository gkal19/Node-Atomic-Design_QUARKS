'use strict';

const expect = require('chai').expect;

const valueTrue = ['05068287512'];
const valueFalse = ['@31231ws',''];

const testeTrue = (values) => {
	values.forEach((element,index) => {
		it('testando: '+element,() => {
			expect(require('./isCpf')(element)).to.equal(true);
		});
	});
}

const testeFalse = (values) => {
	values.forEach((element,index) => {
		it('testando: '+element,() => {
			expect(require('./isCpf')(element)).to.equal(false);
		});
	});
}

describe('testando cpf :', () => {
	describe('teste true: ',() => testeTrue(valueTrue));
	describe('teste false: ',() => testeFalse(valueFalse));
});
