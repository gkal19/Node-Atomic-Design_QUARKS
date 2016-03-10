'use strict';

module.exports = (value, list) => {

  return require('./createIsIn')(list)(value);
};
