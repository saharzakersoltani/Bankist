'use strict';

///////////////////////////////////////
// Selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const navLinks = document.querySelector('.nav__links');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// implementing smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// page navigation

// way1:
const navLink = document.querySelectorAll('.nav__link');

// navLink.forEach(element => {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Way2: Delegation ✅
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// building a tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Activate button
  if (!clicked) return; // Guard Clause (it's a modern technique)

  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  // Activate content
  contents.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Implementing a sticky navigation

// way1:                   This way reduce the performance so we should use another way(Intersection observer API)
// const initialcoords = section1.getBoundingClientRect();
// console.log(initialcoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialcoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Way2:
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries, obsever) {
  const [entry] = entries; // get the first entries[0]
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
///////////////lecture/////////////////
///////////////////////////////////////
/*
// lecture: Selecting, Creating, and deleting
// Selecting
const mainHeader = document.querySelector('.header');
console.log(mainHeader);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

const sectionOne = document.getElementById('section--1');
console.log(sectionOne);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('highlight'));

// Creating and Inserting Elements
const html = `<header class="header">
<div class="header__title">
        <h4>A simpler banking experience for a simpler life.😊</h4>
      </div></header>`;
// mainHeader.insertAdjacentHTML('afterbegin', html);

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'This is a cookie to make the page functionality.';
message.innerHTML =
  '<h4 class = "message-text">This is a cookie to make the page functionality.</h4> <button class="btn btn--close-cookie">click on me</button>';

mainHeader.append(message);
// mainHeader.prepend(message);
// mainHeader.append(message.cloneNode(true));
// mainHeader.after(message);
// mainHeader.before(message);

// Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

///////////////////////////////////////
// lecture: Styles, Attributes, and classes

console.log(message.style.backgroundColor);
console.log(message.style.width);

message.style.width = '120%';
message.style.backgroundColor = '#ff00ff';

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 43 + 'px';

document.documentElement.style.setProperty('--color-primary', 'red');

const messageText = document.querySelector('.message-text');
messageText.style.color = 'red';

// Attributes       like src, href, alt in HTML file
const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);

console.log(logo.src);
console.log(logo.getAttribute('src'));

logo.alt = 'This is such a beautiful logo!';
console.log(logo.alt);
logo.setAttribute('alt', 'just a logo');
console.log(logo.alt);

console.log(logo.designer); // undefined attribute
console.log(logo.getAttribute('designer'));
logo.setAttribute('designer', 'sahar zaker soltani');

const twitterLink = document.querySelector('.twitter-link');
console.log(twitterLink.href);
twitterLink.setAttribute('href', '#');
console.log(twitterLink.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
message.classList.add('c', 'b');
message.classList.remove('b');
message.classList.contains('b'); // Not includes in array
message.classList.toggle('c');

message.className = 'Sahar'; // Do not use

///////////////////////////////////////
// lecture: implementing smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// lecture: Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const h1Alert = function (e) {
  alert('You are reading the main header!');
};

h1.addEventListener('mouseenter', h1Alert);

setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 3000);


///////////////////////////////////////
// lecture: Event propagination
// RGB(255, 255, 255)

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () =>
  `RGB(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// const randomColor = `RGB(${randomInt(0, 255)}, ${randomInt(
//   0,
//   255
// )}, ${randomInt(0, 255)})`;
// console.log(randomColor);

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('nav__link');
  console.log(e.target, e.currentTarget);
  console.log(this === e.target, this === e.currentTarget);
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('nav__links');
  console.log(e.target, e.currentTarget);
  console.log(this === e.target, this === e.currentTarget);
  // Stop propagination
  //  e.stopPropagation();
}); // Do not use True for the third argument. IT'S NOT A FGOOD PRACTICE

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('nav');
  console.log(e.target, e.currentTarget);
});


///////////////////////////////////////
// lecture: Event delegation implementing page navigation
// Way1: it reduces the performance because we use forEach() method!
// Way2: Delegation ✅
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

///////////////////////////////////////
// lecture: DOM Traversing

// Downwards: Child
const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Upwards: Parent
console.log(h1.parentElement);
console.log(h1.parentNode);
console.log(h1.closest('.header'));
h1.closest('.header').style.backgroundColor = 'var(--color-tertiary-darker)';
h1.closest('h1').style.backgroundColor = 'var(--color-secondary)';

// Go sideways: Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.nextSibling);
console.log(h1.previousSibling);

console.log(h1.parentElement.children);
console.log([...h1.parentElement.children]);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});


///////////////////////////////////////
// lecture: Implementing a stocky navigation by intersection observer API
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0.1, 0.3],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
