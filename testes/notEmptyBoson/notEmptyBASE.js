'use strict';

module.exports = {
  validate: (value) => {
    console.log('notEmptyBASE: ', value);
    if (value === null || value === undefined) return false;
    return true;
  }
};