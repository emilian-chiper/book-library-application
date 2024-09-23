'use strict';

(function () {
  // Import DOM elements
  const bookContainerElement = document.querySelector('.book-container');
  const modalElement = document.querySelector('.modal');
  const modalBtns = [
    document.querySelector('.btn-add-book'),
    document.querySelector('.close-modal'),
  ];
  const cardFormElement = document.querySelector('.card.card-form');
  const inputElements = [
    ...document.querySelectorAll('.modal .card.card-form li input'),
    document.querySelector('.modal .card.card-form li select'),
  ];
  const insertBookBtn = document.querySelector('.btn-submit-book');

  // Store books
  const bookShelf = [];

  // Generate a unique ID for each book
  const genBookID = function () {
    return `book-${Date.now()}`;
  };

  // Updates display
  const updateDisplay = function (arr, displayAll = true) {
    bookContainerElement.innerHTML = '';

    if (!arr || arr.length === 0) return;

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

  // Close modal when clicking outside teh form element
  const closeModalOnClickOutside = function (e) {
    if (
      modalElement.classList.contains('open') &&
      !cardFormElement.contains(e.target)
    ) {
      toggleModalVisibility();
    }
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
    const [title, author, pubYear, pages, status] = inputElements.map(
      el => el.value
    );

    const newBook = new Book(title, author, pubYear, pages, status);

    return newBook;
  };

  // Checks if inputs are empty
  const checkFormInputs = function () {
    return inputElements.some(el => el.value.trim() === '');
  };

  // Clear form inputs
  const clearFormInputs = function () {
    inputElements.map(el => (el.value = ''));
  };

  // Pushes a new book onto the shelf
  const insertBook = function (e) {
    e.preventDefault();
    if (checkFormInputs()) {
      alert('Please fill out the form.');
      return;
    }
    bookShelf.push(createBook());
    updateDisplay(bookShelf);
    clearFormInputs();
  };

  // Find book by ID
  const findBookByID = function (bookID) {
    return bookShelf.find(el => el.bookID === bookID);
  };

  // Finds book index by ID
  const findBookIndexByID = function (bookID) {
    return bookShelf.findIndex(book => book.bookID === bookID);
  };

  // Toggle read status
  const toggleReadStatus = function (e) {
    const button = e.target.closest('.btn-status');
    if (!button) return;
    const bookID = button.dataset.id;
    const book = findBookByID(bookID);
    if (book) {
      book.status = book.status === 'Read' ? 'Unread' : 'Read';
      updateDisplay(bookShelf);
    }
  };

  // Deletes book
  const deleteBook = function (e) {
    const button = e.target.closest('.btn-delete-book');
    if (!button) return;
    const bookID = button.dataset.id;

    // Find the index of the book in the array
    const bookIndex = findBookIndexByID(bookID);

    if (bookIndex !== -1) {
      bookShelf.splice(bookIndex, 1); // Removes the book at the found index
      console.log(bookShelf);
      updateDisplay(bookShelf); // Update the display after deletion
    }
  };

  // Attaches event handlers
  const attachHandlers = function () {
    modalBtns.map(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleModalVisibility();
      });
    });
    document.addEventListener('click', closeModalOnClickOutside);
    insertBookBtn.addEventListener('click', insertBook);
    bookContainerElement.addEventListener('click', function (e) {
      if (e.target.closest('.btn-status')) {
        toggleReadStatus(e);
      } else if (e.target.closest('.btn-delete-book')) {
        deleteBook(e);
      }
    });
  };

  // Function calls
  window.addEventListener('DOMContentLoaded', updateDisplay(bookShelf));
  attachHandlers();
})();
