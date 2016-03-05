'use strict';

module.exports = {
  validate: (value) => {
    console.log('notEmptyString: ', value);
    if (!value.match(/[a-zA-Z]+/g)) return false;
  }
};