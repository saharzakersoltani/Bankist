'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// I create this project while I was learning javaSCript from Jonas Schmedtmann course.

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2025-06-05T14:11:59.604Z',
    '2025-07-03T17:01:17.194Z',
    '2025-07-04T23:36:17.929Z',
    '2025-07-06T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Sahar Zaker Soltani',
  movements: [2500, 5400, -500, -140, -3560, -6000, 4700, -90],
  interestRate: 1.3,
  pin: 3333,
  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2019-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'IRR',
  locale: 'fa-IR',
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// DETAILS make a function for display dates
const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// DETAILS make a function to display numbers based on INTL API
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // DETAILS Create a new object to fix the BUG of sort part
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDates: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, index) {
    const { movement, movementDates } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatMovementsDate(
      new Date(movementDates),
      acc.locale
    );

    const formatedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatedMov}</div>
        </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// DETAILS display balance
const displayBalace = function (acc) {
  acc.balace = acc.movements.reduce((accu, mov) => accu + mov, 0);
  labelBalance.textContent = formatCur(acc.balace, acc.locale, acc.currency);
};

// DETAILS display the summary of movements in (in, out, interest)
const displaySummary = function (acc) {
  // In
  const sumIn = acc.movements
    .filter(value => value > 0)
    .reduce((accu, value) => accu + value, 0);
  labelSumIn.textContent = formatCur(sumIn, acc.locale, acc.currency);
  // Out
  const sumOut = acc.movements
    .filter(value => value < 0)
    .reduce((accu, value) => accu + value, 0);
  labelSumOut.textContent = formatCur(sumOut, acc.locale, acc.currency);
  // Interest
  const sumInterest = acc.movements
    .filter(value => value > 0)
    .map(value => (value * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((accu, value) => accu + value, 0);
  labelSumInterest.textContent = formatCur(
    sumInterest,
    acc.locale,
    acc.currency
  );
  console.log(sumInterest);
};

// DETAILS create username for each of the accounts
const createUsername = function (accs) {
  accs.forEach(function (value) {
    value.username = value.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join('');
  });
};
createUsername(accounts);

// DETAILS write one function for displays in order not to make our code ugly all of the time😉
const display = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  displayBalace(acc);
  // Display summary
  displaySummary(acc);
};

// DETAILS Start log out timer
// NOTE: first we create a setInterval timer simply but then we saw that we logout the page in the 1 seconds that remainded and some how do not see the last second!
// So we make another function to put all our logics that we have written them before and than call that and put it in our setInternal. The BUG fixed.
// Then we see another problem: wehen we logged in an account like js and then immediatly alter the account we saw that the timer hadn't stopped!! so we define a <timer> before the btnLogin.addEventListener function... Then this BUG fixed too.
// Now there is one more thing that we should do it: we want the time count down reset when ever we do some transactions like loan and transfering money. so we should fix this BUG too!
const startLogOuttimer = function () {
  let time = 120;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////////////////////////
// Event handler

let currentAccount, timer;

// DETAILS FAKE ALWAYES LOGGED IN
// currentAccount = accounts[0];
// display(currentAccount);
// containerApp.style.opacity = 100;

// DETAILS login button
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(user => {
    return user.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    containerApp.style.opacity = 100;
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Clear input feilds
    inputLoginUsername.value = inputLoginPin.value = '';

    // Create current date and time
    // Experimnting API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };
    // const locales = navigator.language;
    // labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now); // REFERENCE
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); // 02
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // 08
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // clear timer when ever user logged in with another account
    if (timer) clearInterval(timer);
    timer = startLogOuttimer();

    display(currentAccount);
  }
});

// DETAILS transform money part
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value; // + means Number()
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    recieverAcc &&
    amount <= currentAccount.balace &&
    currentAccount?.username !== recieverAcc.username
  ) {
    // Doing the transfers
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    // Set the timer count down reset
    clearInterval(timer);
    timer = startLogOuttimer();
  }

  // Updated UI
  display(currentAccount);

  // clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

// DETAILS Close account part
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername?.value === currentAccount.username &&
    Number(inputClosePin?.value) === currentAccount.pin
  ) {
    const close = accounts.findIndex(acc => {
      return acc.username === currentAccount.username;
    });
    accounts.splice(close, 1);
    console.log(`Acount ${currentAccount.owner} deleted successfully!`);
    // Display UI off
    containerApp.style.opacity = 0;
    // Clear input fields
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
  }
});

// DETAILS Request loan part
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // set timeout to get loan after 3 seconds
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(Math.floor(amount));
      // Add transfer dates
      currentAccount.movementsDates.push(new Date().toISOString());

      clearInterval(timer);
      timer = startLogOuttimer();

      // Display UI
      display(currentAccount);
    }, 3000);

    // Clear input fields
    inputLoanAmount.value = '';
  }
});

// DETAILS Sort movements part
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

/*
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
*
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
*

/////////////////////////////////////////////////
// lecture: creating dates

// Create a date: (There are 4 ways)

const now = new Date();
console.log(now);

console.log(new Date('Sun Jul 06 2025 16:52:42'));

console.log(new Date());

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2038, 10, 33, 18, 32, 20));

// Unix timestamp started from Jan 1 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // three days after the unix date => jan 4 1970  THIS IS THE TIMESTAMP

// Working with dates
const future = new Date(2030, 3, 4, 13, 25, 30);
console.log(future);

console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(1901526930000));

console.log(Date.now());
console.log(new Date(1751810676002));

future.setFullYear(2052);
console.log(future);


/////////////////////////////////////////////////
// lecture: Operations with dates
const future2 = new Date(2020, 3, 8, 13, 25, 30);
const now2 = new Date(2020, 3, 4, 13, 25, 30);
console.log((future2 - now2) / (1000 * 24 * 60 * 60));

// Create a function to calculate days passed between two dates
const calcDaysPassed2 = (day1, day2) =>
  Math.round(Math.abs((day2 - day1) / (1000 * 24 * 60 * 60)));

const data1 = console.log(
  calcDaysPassed2(new Date(2020, 5, 8), new Date(2020, 4, 10))
);
const data2 = console.log(
  calcDaysPassed2(new Date(2020, 1, 8), new Date(2020, 4, 10))
);

/////////////////////////////////////////////////
// lecture: Internationalization Dates (INTL)
const locale2 = navigator.language;

const option2 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  date: 'numeric',
  year: 'numeric',
  dayperiod: '',
};

const now2 = new Date();

console.log(new Intl.DateTimeFormat(locale2, option2).format(now2));


/////////////////////////////////////////////////
// lecture: Internationalization Numbers (INTL)
const number1 = 1235468242.56;
const options1 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log(new Intl.NumberFormat('de-DE', options1).format(number1));
console.log(new Intl.NumberFormat('en-US', options1).format(number1));
console.log(new Intl.NumberFormat('fa-IR', options1).format(number1));

console.log(
  new Intl.NumberFormat(navigator.language, options1).format(number1)
);

/////////////////////////////////////////////////
// lecture: Timers set timeout and set interval
// set timeout

// task1: we want to have our pizza exactly after 3 seconds from ordered time.

// way1
const pizzaTimer1 = setTimeout(
  (ing1, ing2) => console.log(`Your pizza ${ing1} and ${ing2} is delivered🍕`),
  5000,
  'olives',
  'tomato'
);

// way2
const ingredients2 = ['olives', 'tomato'];
const pizzaTimer2 = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza ${ing1} ${ing2}🍕`),
  5000,
  ...ingredients2
);

// task2: if the pizza has olives i want to cancle the ordre
if (ingredients2.includes('olives')) clearTimeout(pizzaTimer2); // Cancle the timeout

// set interval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/
