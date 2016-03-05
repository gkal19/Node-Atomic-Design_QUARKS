'use strict';

module.exports = {
  validate: (value) => {
    if (value === null || value === undefined) return false;
    return true;
  }
};