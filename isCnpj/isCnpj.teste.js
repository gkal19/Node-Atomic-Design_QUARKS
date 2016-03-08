'use strict';

const expect = require('chai').expect;

const valueFalse = ['','000000000'];
const valueTrue = ['60422522000103','04584044000167'];

const testeFalse = (values) => {
	values.forEach((element,index) =>{
		it('Testando: '+element,() => {
			expect(require('./isCnpj')(element)).to.equal(false);
		});
	});
}


const testeTrue = (values) => {
	values.forEach( (element,index) => {
		it('Testando: '+element,() => {
			expect(require('./isCnpj')(element)).to.equal(true);
		});
	});
}

describe('Teste de cnpj ',() => {
	describe('cnpj invalido: ',() => testeFalse(valueFalse));
	describe('cnpj validos: ',() => testeTrue(valueTrue));
});


