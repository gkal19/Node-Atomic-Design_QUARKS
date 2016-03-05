'use strict';

module.exports = (value) => {

  // Ele não pode passar daqui se for null ou undefined
  // se não quebrará a função isOnlyLetters q usa match()
  console.log('VALUE: ', value);
  const validated = require('./isEmpty')(value)
  if (validated) return true;
  console.log('validated: ', validated);

  // Funções is precisam receber o valor diretamente no require
  const isOnlyLetters = require('./isOnlyLetters')(value);
  if (!isOnlyLetters) return true;

  return false;
};
