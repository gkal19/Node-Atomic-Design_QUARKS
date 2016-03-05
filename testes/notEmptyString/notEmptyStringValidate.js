'use strict';

const notEmpty = require('./notEmptyString');

module.exports = {
  validator: (value) => {
    return notEmpty.validate(value);
  }
, message: 'O valor {VALUE} para o campo nome não pode ser vazio!'
};