'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// lecture: converting and checking numbers

console.log(23 === '23');
console.log(23 === 23);

console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.2);

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('56px'));
console.log(Number.parseInt('k59')); //NaN
console.log(Number.parseFloat('3.1px'));

console.log(Number.parseInt('   28y  '));
console.log(Number.parseFloat('  28y  '));

// NaN : Not a Number
console.log(Number.isNaN(23));
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23'));
console.log(Number.isNaN(23 / 0));

// Finite: Check value if is a number
console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
console.log(Number.isFinite(+'23'));
console.log(Number.isFinite(23 / 0));

// Integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
