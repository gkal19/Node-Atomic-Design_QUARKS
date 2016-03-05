'use strict';

module.exports = (type) => {
  switch (type) {
    case 'String':
      return require('./notEmptyString');
      break;
    default:
      return require('./notEmptyBASE');
      break;
  }
};