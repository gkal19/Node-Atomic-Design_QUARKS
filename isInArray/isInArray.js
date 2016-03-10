'use strict';

module.exports = (value, list) => {

  const isIn = require('./createIsIn')(list)

  const validated = isIn(value);
  if (validated) return true;

  return false;
};
