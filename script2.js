'use strict';
/*
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

/////////////////////////////////////////////////
// lecture: Math and rounding

// sqrt
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// max and min
console.log(Math.max(8, 5, 45, 2, 9));
console.log(Math.min(8, 5, 45, 2, 9));

console.log(Math.PI * Number.parseInt('100e'));

console.log(Math.trunc(Math.random() * 6) + 1);

// Create a function to get random numbr
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

console.log(randomNumber(10, 20));
console.log(randomNumber(0, 2));

// Rounding integers
console.log(Math.round(23.1)); // Always round to the neaarst integer
console.log(Math.round(23.9));
console.log(Math.round(-23.1));
console.log(Math.round(-23.9));

console.log(Math.floor(45.1)); // round down
console.log(Math.floor(45.9));
console.log(Math.floor(-45.1));
console.log(Math.floor(-45.9));

console.log(Math.trunc(78.1)); // removes any decimal parts
console.log(Math.trunc(78.9));
console.log(Math.trunc(-78.1));
console.log(Math.trunc(-78.9));

console.log(Math.ceil(63.1)); // round up
console.log(Math.ceil(63.9));
console.log(Math.ceil(-63.1));
console.group(Math.ceil(-63.9));

// Rounding decimals
console.log((98.258).toFixed(2));

/////////////////////////////////////////////////
// lecture: The remainder operator

// remainder
console.log(5 % 2);
console.log(5 / 2);

// Create a function to check if a number is even or not
const isEven = n => n % 2 === 0;
console.log(isEven(4));
console.log(isEven(15));
console.log(isEven(28));
console.log(isEven(76));

// make the rows of the bankist project colorful😄

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(
    (movementRow, index) => {
      if (index % 2 === 0) movementRow.style.backgroundColor = 'blue';
    }
  );
});

/////////////////////////////////////////////////
// lecture: Numeric seperators

const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_36;
console.log(price);

const transferFee1 = 15_2;
const transferFee2 = 1025_25;
console.log(transferFee1, transferFee2);

const PI = 3.14_15;
console.log(PI);

console.log(Number('235_54')); // NaN
console.log(parseInt('23_54')); // 23
*/
/////////////////////////////////////////////////
// lecture: working with bigInt

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 4); // it doesn't get the answer correctly because 2 ** 53 -1 is a large number and all numbrs after this is not safe in JS. so we should use bigInt numbers

console.log(127736736778565665675878676876786787674424424);
console.log(127736736778565665675878676876786787674424424n);
console.log(BigInt(127736736778565665675878676876786787674424424));

// Exceptions
console.log(15n + 3n);
console.log(20n > 6);
console.log(10n > 4n);
console.log(20n === 20);
console.log(20n == 20);
console.log(20n == '20');
//console.log(Math.sqrt(4n)); // not work

const hugeNum = 4564794134749964563497643498n;
const num = 25;
//console.log(hugeNum * num); //Cannot mix BigInt and other types
console.log(BigInt(num) * hugeNum);

console.log(hugeNum + 'its very big number!!!!');

// Diversions
//console.log(16n / 4); // not work
console.log(16n / 4n);
console.log(12n / 5n);
console.log(12 / 5);
