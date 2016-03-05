'use strict';

module.exports = {
  validate: (type, value) => {
    if (value === null || value === undefined) return false;
    switch (type) {
      case 'String':
        return !require('./isOnlyLetters')(value);
        break;
      default:
        return false;
        break;
    }
    return true;
  }
};