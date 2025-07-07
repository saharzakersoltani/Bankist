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
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

const accounts = [account1, account2];

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

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // Create a new object to fix the BUG of sort part
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDates: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);
  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements; //use slice() to have a shallow copy of movements
  combinedMovsDates.forEach(function (obj, index) {
    const { movement, movementDates } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = new Date(movementDates);
    const day = `${displayDate.getDate()}`.padStart(2, 0);
    const month = `${displayDate.getMonth() + 1}`.padStart(2, 0);
    const year = displayDate.getFullYear();

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${day}/${month}/${year}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>
    
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// display balance
const displayBalace = function (acc) {
  acc.balace = acc.movements.reduce(function (accu, mov) {
    return accu + mov;
  }, 0);
  labelBalance.textContent = `${acc.balace.toFixed(2)} €`;
};

// Create current date and time
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0); // 02
const month = `${now.getMonth() + 1}`.padStart(2, 0); // 08
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const minutes = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

// display the summary of movements in (in, out, interest)
const displaySummary = function (acc) {
  // In
  const sumIn = acc.movements
    .filter(value => value > 0)
    .reduce((accu, value) => accu + value, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;
  // Out
  const sumOut = acc.movements
    .filter(value => value < 0)
    .reduce((accu, value) => accu + value, 0);
  labelSumOut.textContent = `${Math.abs(sumOut).toFixed(2)}€`;
  // Interest
  const sumInterest = acc.movements
    .filter(value => value > 0)
    .map(value => (value * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((accu, value) => accu + value, 0);
  labelSumInterest.textContent = `${sumInterest.toFixed(2)}€`;
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

/////////////////////////////////////////////////
// Event handler
let currentAccount;

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
    display(currentAccount);

    // Clear input feilds
    inputLoginUsername.value = inputLoginPin.value = '';
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
    // Updated UI
    display(currentAccount);
    // clear input fields
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();

    // Add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());
  }
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
    // Add movement
    currentAccount.movements.push(Math.floor(amount));
    // Add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
  }
  // Display UI
  display(currentAccount);
  // Clear input fields
  inputLoanAmount.value = '';
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
