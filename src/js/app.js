'use strict';

// Imports
const bookContainerElement = document.querySelector('.book-container');
const modalElement = document.querySelector('.modal');

const modalBtns = [
  document.querySelector('.btn-add-book'),
  document.querySelector('.close-modal'),
];

const toggleModalVisibility = function () {
  modalElement.classList.toggle('open');
};

const attachHandlers = function (arr) {
  arr.map(el => {
    el.addEventListener('click', toggleModalVisibility);
  });
};

attachHandlers(modalBtns);
