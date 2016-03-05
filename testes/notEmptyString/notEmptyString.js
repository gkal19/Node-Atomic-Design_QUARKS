'use strict';

module.exports = {
  validate: (value) => {
    // console.log('notEmptyString: ', value);
    // SEMPRE validamos o notEmptyBASE primeiro

    // Ele não pode passar daqui se for null ou undefined
    // se não quebrará a função isOnlyLetters q usa match()
    const validated = require('./notEmpty')(value)
    if (!validated) return false;

    // Funções is precisam receber o valor diretamente no require
    const isOnlyLetters = require('./isOnlyLetters')(value);
    if (!isOnlyLetters) return false;
    return true;
  }
};