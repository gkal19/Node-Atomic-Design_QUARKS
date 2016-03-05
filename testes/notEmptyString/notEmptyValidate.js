'use strict';

const notEmpty = require('./notEmpty')
module.exports = {
  validate: (value) => {
    const validated = require('./notEmpty')(value)
    if (!validated) return false;

    return true;
  }
, message: 'O valor "{VALUE}" não pode ser vazio!'
};