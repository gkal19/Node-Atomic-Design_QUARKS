'use strict';

module.exports = (value) => {

	const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3})+$/;
	const isEmpty = require('../isEmpty/isEmpty')(value);
	if(isEmpty) return false;

	return regex.test(value);

 }