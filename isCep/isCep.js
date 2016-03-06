'use strict';

const regex = /^[0-9]{8}$/;

module.exports = (value) => {
    value = value.replace(/\.|\-/g, '');    
    const isEmpty = require('./isEmpty')(value);       
    const isCep = regex.test(value);
    if(isEmpty || !isCep) return false;
    
    return true;         
}