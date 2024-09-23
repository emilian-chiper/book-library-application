'use strict';

/**
 * IIFE to prevent polution of global scope
 */
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

  /**
   * Generates a unique ID for each book.
   * @returns {string} The unique book ID.
   */
  const genBookID = function () {
    return `book-${Date.now()}`;
  };

  /**
   * Updates the display of books on the page
   * @param {Array} arr - The array of books to display
   * @param {boolean} [displayAll=true] - Whether to display all books or just the latest.
   * @returns
   */
  const updateDisplay = function (arr, displayAll = true) {
    bookContainerElement.innerHTML = '';

    if (!arr || arr.length === 0) return;

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

  /**
   * Toggles the visibility of the modal
   */
  const toggleModalVisibility = function () {
    modalElement.classList.toggle('open');
  };

  /**
   * Closes the modal when clicking outside of the form element.
   * @param {Even} e - The click event
   */
  const closeModalOnClickOutside = function (e) {
    if (
      modalElement.classList.contains('open') &&
      !cardFormElement.contains(e.target)
    ) {
      toggleModalVisibility();
    }
  };

  /**
   * Book constructor
   * @ constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} pubYear - The publication year of the book.
   * @param {pnumber} pages - The number of pages in the book.
   * @param {string} status - The reading status of the book (e.g. "Read" or "Unread")
   */
  const Book = function (title, author, pubYear, pages, status) {
    this.bookID = genBookID();
    this.title = title;
    this.author = author;
    this.pubYear = pubYear;
    this.pages = pages;
    this.status = status;
  };

  /**
   * Creates and returns a new book instance based on form input values.
   * @returns {Book} A new instance of the book object.
   */
  const createBook = function () {
    const [title, author, pubYear, pages, status] = inputElements.map(
      el => el.value
    );

    const newBook = new Book(title, author, pubYear, pages, status);

    return newBook;
  };

  /**
   * Checks if any of the form inputs are empty.
   * @returns {boolean} True if any input is empty, false otherwise.
   */
  const checkFormInputs = function () {
    return inputElements.some(el => el.value.trim() === '');
  };

  /**
   * Clears the form input fields after submission.
   */
  const clearFormInputs = function () {
    inputElements.map(el => (el.value = ''));
  };

  /**
   * Inserts a new book into the bookshelf and updates the display.
   * @param {Event} e - The click event
   */
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

  /**
   * Finds a book by its ID.
   * @param {string} bookID - The ID of the book to find.
   * @returns {Object|null} - The book object if found, null if not.
   */
  const findBookByID = function (bookID) {
    return bookShelf.find(el => el.bookID === bookID);
  };

  // Finds book index by ID
  const findBookIndexByID = function (bookID) {
    return bookShelf.findIndex(book => book.bookID === bookID);
  };

  /**
   * Toggles the read status of a book.
   * @param {Event} e - The click event.
   */
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

  /**
   * Deletes a book from the bookshelf and updates the display.
   * @param {Event} e - The click event.
   */
  const deleteBook = function (e) {
    const button = e.target.closest('.btn-delete-book');
    if (!button) return;
    const bookID = button.dataset.id;

    const bookIndex = findBookIndexByID(bookID);

    if (bookIndex !== -1) {
      bookShelf.splice(bookIndex, 1); // Removes the book at the found index
      console.log(bookShelf);
      updateDisplay(bookShelf); // Update the display after deletion
    }
  };

  /**
   * Attaches event handlers for modal button, form submission, and book container actions.
   */
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

  // Initialize the application
  window.addEventListener('DOMContentLoaded', updateDisplay(bookShelf));
  attachHandlers();
})();
