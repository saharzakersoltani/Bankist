'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

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

// make a function for display dates
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

// make a function to display numbers based on INTL API 🤑🤑🤑🤑
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // Create a new object to fix the BUG of sort part
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

// display balance
const displayBalace = function (acc) {
  acc.balace = acc.movements.reduce((accu, mov) => accu + mov, 0);
  labelBalance.textContent = formatCur(acc.balace, acc.locale, acc.currency);
};

// display the summary of movements in (in, out, interest)
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

// create username for each of the accounts
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

// write one function for displays in order not to make our code ugly all of the time😉
const display = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  displayBalace(acc);
  // Display summary
  displaySummary(acc);
};

// Start log out timer
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

// FAKE ALWAYES LOGGED IN
// currentAccount = accounts[0];
// display(currentAccount);
// containerApp.style.opacity = 100;

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

    if (timer) clearInterval(timer);
    timer = startLogOuttimer();

    display(currentAccount);
  }
});

// transform money part
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

// Close account part
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
  }
});

// Request loan part
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

// Sort movements part
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
