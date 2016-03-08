'use strict';

const expect = require('chai').expect;

const valueFalse = ['abc',1020,'@2222','',123456789,00];
const valueTrue = ['60422522000103','32961969000115'];

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

describe('Teste de cpf ',() => {
	describe('cpf invalido: ',() => testeFalse(valueFalse));
	describe('cpf validos: ',() => testeTrue(valueTrue));
});


