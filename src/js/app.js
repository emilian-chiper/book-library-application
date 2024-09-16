'use strict';

(function () {
  // Import DOM elements
  const bookContainerElement = document.querySelector('.book-container');
  const modalElement = document.querySelector('.modal');
  const modalBtns = [
    document.querySelector('.btn-add-book'),
    document.querySelector('.close-modal'),
  ];
  const bookTitleElement = document.querySelector('#book-title');
  const bookAuthorElement = document.querySelector('#book-author');
  const bookPubYearElement = document.querySelector('#book-publish-year');
  const bookPagesElement = document.querySelector('#book-pages');
  const bookStatusElement = document.querySelector('#book-status');
  const insertBookBtn = document.querySelector('.btn-submit-book');

  // Store books
  const bookShelf = [];

  // Generate a unique ID for each book
  const genBookID = function () {
    return `book-${Date.now()}`;
  };

  // Updates display
  const updateDisplay = function (arr, displayAll = true) {
    if (!arr || arr.length === 0) return;

    bookContainerElement.innerHTML = '';

    // If displayAll is false, display only the last book
    const booksToDisplay = displayAll ? arr : [arr[arr.length - 1]];

    booksToDisplay.forEach(el => {
      const { bookID, title, author, pubYear, pages, status } = el;

      const markdown = `
        <div class="card card-book" data-id="${bookID}">
          <h4>${title}</h4>
          <p>Author: <em>${author}</em></p>
          <p>Published: <em>${pubYear}</em></p>
          <p>Pages: <em>${pages}</em></p>
          <div class="button-container">
            <button class="btn btn-status ${status.toLowerCase()}" data-id="${bookID}">${status.toUpperCase()}</button>
            <button class="btn btn-delete-book" data-id="${bookID}">DELETE</button>
          </div>
        </div>
      `;

      bookContainerElement.insertAdjacentHTML('beforeend', markdown);
    });
  };

  // Toggles modal visibility
  const toggleModalVisibility = function () {
    modalElement.classList.toggle('open');
  };

  // Book object constructor
  const Book = function (title, author, pubYear, pages, status) {
    this.bookID = genBookID();
    this.title = title;
    this.author = author;
    this.pubYear = pubYear;
    this.pages = pages;
    this.status = status;
  };

  // Creates and returns a new instance of the book object
  const createBook = function () {
    const title = bookTitleElement.value;
    const author = bookAuthorElement.value;
    const pubYear = bookPubYearElement.value;
    const pages = bookPagesElement.value;
    const status = bookStatusElement.value;

    const newBook = new Book(title, author, pubYear, pages, status);

    return newBook;
  };

  // Pushes a new book onto the shelf
  const insertBook = function (e) {
    e.preventDefault();
    bookShelf.push(createBook());
    updateDisplay(bookShelf);
  };

  // Attaches event handlers
  const attachHandlers = function () {
    modalBtns.map(btn => {
      btn.addEventListener('click', toggleModalVisibility);
    });
    insertBookBtn.addEventListener('click', insertBook);
  };

  // Function calls
  window.addEventListener('DOMContentLoaded', updateDisplay(bookShelf));
  attachHandlers();
})();
