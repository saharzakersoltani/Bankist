'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
///////////////lecture/////////////////

///////////////////////////////////////
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
  'This is a cookie to make the page functionality. <button class="btn btn--close-cookie">click on me</button>';

// mainHeader.append(message);
mainHeader.prepend(message);
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
