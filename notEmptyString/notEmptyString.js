'use strict';

const notEmpty = require('./notEmptyBASE');

module.exports = {
  validate: (value) => {
    // console.log('notEmptyString: ', value);
    // SEMPRE validamos o notEmptyBASE primeiro
    const validated = notEmpty.validate(value);
    if (!validated) return false;
    if (!value.match(/[a-zA-Z]+/g)) return false;
    return true;
  }
};