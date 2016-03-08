'use strict';

module.exports = (value) => {
	if(typeof value === 'number') return false;

	value = value.replace(/[^\d]+/g,'');

    if(value == '') return false;

    if (value.length != 14)
        return false;

    // LINHA 10 - Elimina CNPJs invalidos conhecidos
    if (value == "00000000000000" || 
        value == "11111111111111" || 
        value == "22222222222222" || 
        value == "33333333333333" || 
        value == "44444444444444" || 
        value == "55555555555555" || 
        value == "66666666666666" || 
        value == "77777777777777" || 
        value == "88888888888888" || 
        value == "99999999999999")
        return false; // LINHA 21

    // Valida DVs LINHA 23 -
    var tamanho = value.length - 2
    var numeros = value.substring(0,tamanho);
    var digitos = value.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = value.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false; // LINHA 49
    return true;
}