'use strict';

module.exports = (value) => {

	let soma = 0;
	let resto = undefined;
	if(value == '00000000000') return false;

	for(var n = 1; n<=9; n++) {
		soma = soma + parseInt(value.substring(n - 1 , n)) * (11 - n);
	}

	resto = (soma * 10) % 11;


	if((resto == 10) || (resto == 11) ) resto = 0;

	if(resto != parseInt(value.substring(9,10)) ) return false;

	soma = 0;

	for(n = 1; n<= 10; n++) {
		soma = soma + parseInt(value.substring(n - 1 , n )) * (12 - n);
	}

	resto = (soma * 10) % 11;

	if((resto == 10) || (resto == 11)) resto = 0;

	if(resto != parseInt(value.substring(10 , 11))) return false;

	return true;	

}