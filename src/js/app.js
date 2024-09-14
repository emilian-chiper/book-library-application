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

// const bookExample = {
//   bookTitle: 'The Hobbit',
//   bookAuthor: 'J.R.R. Tolkien',
//   bookPubYear: 1937,
//   bookPages: 321,
//   bookStatus: 'undread',
// };

const displayBook = function (book) {
  const { bookTitle, bookAuthor, bookPubYear, bookPages, bookStatus } = book;
  const markdown = `
  <div class="card card-book">
    <h4>${bookTitle}</h4>
    <p>Author: <em>${bookAuthor}</em></p>
    <p>Published: <em>${bookPubYear}</em></p>
    <p>Pages: <em>${bookPages}</em></p>
    <div class="button-container">
      <button class="btn btn-status read">${bookStatus.toUpperCase()}</button>
      <button class="btn btn-delete-book">DELETE</button>
    </div>
  </div>
  `;

  bookContainerElement.insertAdjacentHTML('beforeend', markdown);
};

// displayBook(bookExample);

const attachHandlers = function (arr) {
  arr.map(el => {
    el.addEventListener('click', toggleModalVisibility);
  });
};

attachHandlers(modalBtns);
