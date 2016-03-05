'use strict';

module.exports = (value) => {

  // Ele não pode passar daqui se for null ou undefined
  // se não quebrará a função isOnlyLetters q usa match()
  const validated = require('./isEmpty')(value)
  if (validated) return true;

  // Se não é NULL nem UNDEFINED
  // Se não é só letras
  const isOnlyLetters = require('./isOnlyLetters')(value);
  if (!isOnlyLetters) return true;

  return false;
};
