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

const bookShelves = [];

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

const insertBook = function (e) {
  e.preventDefault();
  const bookTitleElement = document.querySelector('#book-title');
  const bookAuthorElement = document.querySelector('#book-author');
  const bookPubYearElement = document.querySelector('#book-publish-year');
  const bookPagesElement = document.querySelector('#book-pages');
  const bookStatusElement = document.querySelector('#book-status');

  bookShelves.push({
    bookTitle: `${bookTitleElement.value}`,
    bookAuthor: `${bookAuthorElement.value}`,
    bookPubYear: `${bookPubYearElement.value}`,
    bookPagesElement: `${bookPagesElement.value}`,
    bookStatus: `${bookStatusElement.value}`,
  });

  displayBook(bookShelves[bookShelves.length - 1]);
  console.log(bookShelves[bookShelves.length - 1]);
};

const submitBookBtn = document.querySelector('.btn-submit-book');
submitBookBtn.addEventListener('click', insertBook);

const attachHandlers = function (arr) {
  arr.map(el => {
    el.addEventListener('click', toggleModalVisibility);
  });
};

attachHandlers(modalBtns);
