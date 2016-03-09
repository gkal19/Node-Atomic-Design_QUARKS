'use strict';

module.exports = (value) => {

	const isEmpty = require('../isEmpty/isEmpty')(value);
	if(isEmpty) return false;

	const isString = require('../isString/isString')(value);
	if(!isString) return false;

	let campos = value.split('');
	let colunas = [];
	const arrayPrimeiroDig = ['10','9','8','7','6','5','4','3','2'];
	const primeiroDig = 2;

	const arraySegundoDig = ['11','10','9','8','7','6','5','4','3','2'];
	const segundoDig = 1;
	


	const verificaDigito = (campos , colunas , arrayVerificador,numDigito) => {		
		
		for(let i = 0; i < arrayVerificador.length; i++) {
			colunas[i] = campos[i] * arrayVerificador[i];
		}

		//console.log('colunas: '+colunas.length);
		//console.log('campos: '+campos.length);

		let soma = 0;

		colunas.forEach((valor) => {
			soma = valor + soma;
		});

		let resto = soma % 11;
		let digitoVerificador = null;

		if(resto < 2) {
			digitoVerificador = 0;
		} else {
			digitoVerificador = 11 - resto;
		}

		let digito = campos.length - numDigito;

		//if(numDigito == 1) console.log('Verificando segundo digito');
		//if(numDigito == 2) console.log('Verificando primeiro digito');
		//console.log('digito do cpf: '+campos[digito]);
		//console.log('digito Verificador: '+digitoVerificador);


		if(digitoVerificador == campos[digito])
			return true;
		return false;
	}

	let valorPrimeiro = verificaDigito(campos,colunas,arrayPrimeiroDig,primeiroDig);
	let valorSegundo = verificaDigito(campos,colunas,arraySegundoDig,segundoDig);

	if(valorPrimeiro && valorSegundo) 
		return true;
	return false;
	//console.log('Verificando o primeiro digito: '+verificaDigito(campos,colunas,arrayPrimeiroDig,primeiroDig));
	//console.log('Verificando o segundo digito: '+verificaDigito(campos,colunas,arraySegundoDig,segundoDig));
}