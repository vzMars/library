const libraryGrid = document.querySelector('.library-grid');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const modalForm = document.querySelector('.modal-form');
const errorElement = document.getElementById('error');

closeBtn.addEventListener('click', modalOff);
modalForm.addEventListener('submit', addBookToLibrary);
window.addEventListener('click', modalOff);

let myLibrary = [];

const book1 = new Book('The Blade Itself', 'Joe Abercrombie', 529, 'Read');
const book2 = new Book('Best Served Cold', 'Joe Abercrombie', 534, 'Read');
const book3 = new Book('A Little Hatred', 'Joe Abercrombie', 471, 'To-Read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();

  let bookTitle = title.value;
  let bookAuthor = author.value;
  let bookPages = pages.value;
  let bookReadStatus;
  if (read.checked) {
    bookReadStatus = 'Read';
  } else {
    bookReadStatus = 'To-Read';
  }

  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
  myLibrary.push(newBook);
  console.log(myLibrary);
  console.log(e);
  modalOff(e);
  clearLibrary();
  displayLibrary();
}

function clearLibrary() {
  while (libraryGrid.firstChild) {
    libraryGrid.removeChild(libraryGrid.firstChild);
  }
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    let newDiv = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookStatus = document.createElement('button');
    let removeBook = document.createElement('button');

    bookTitle.className = 'book-card-title';
    bookAuthor.className = 'book-card-text';
    bookPages.className = 'book-card-text';
    bookStatus.className = 'book-card-btn';
    removeBook.className = 'book-card-btn';
    if (book.read === 'Read') {
      newDiv.className = 'book-card-green';
    } else {
      newDiv.className = 'book-card-red';
    }

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `Written by ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    bookStatus.textContent = book.read;
    removeBook.textContent = 'Remove';

    newDiv.appendChild(bookTitle);
    newDiv.appendChild(bookAuthor);
    newDiv.appendChild(bookPages);
    newDiv.appendChild(bookStatus);
    newDiv.appendChild(removeBook);
    libraryGrid.appendChild(newDiv);
  });

  let addCard = document.createElement('div');
  let addIcon = document.createElement('i');
  addIcon.className = 'fa fa-plus fa-5x';
  addCard.className = 'add-card';
  addCard.addEventListener('click', modalOn);
  addCard.appendChild(addIcon);
  libraryGrid.appendChild(addCard);
}

function clearForm() {
  modalForm.reset();
}

function modalOn() {
  modal.className = 'modal on';
}

function modalOff(e) {
  if (
    e.target.className === 'modal on' ||
    e.target.className === 'closeBtn' ||
    e.type === 'submit'
  ) {
    modal.className = 'modal off';
    clearForm();
  }
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// };

displayLibrary();
