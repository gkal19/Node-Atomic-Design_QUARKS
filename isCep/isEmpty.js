'use strict';
//falta colocar o isEmpty em uma pasta separada e remover os outros isEmpty que já tem.

module.exports = (value) => {
  if (value === null || value === undefined) return true;
  return false;
}