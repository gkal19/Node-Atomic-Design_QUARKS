// Criado por @gkal19
import assert from 'assert';

import leapYear from './';

it('Vamos verificar se o ano é um ano bissexto', () => {
	assert(!leapYear(2014));
	assert(leapYear(2016));
	assert(leapYear(new Date(2016, 0)));
	assert(typeof leapYear() === 'boolean');
});
