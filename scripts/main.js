const libraryGrid = document.querySelector('.library-grid');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const modalForm = document.querySelector('.modal-form');
const errorElement = document.getElementById('error');

modalForm.addEventListener('submit', addBook);
window.addEventListener('click', modalOff);
closeBtn.addEventListener('click', modalOff);

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

Book.prototype.changeReadStatus = function () {
  console.log(`before: ${this.read}`);
  if (this.read === 'Read') {
    this.read = 'To-Read';
  } else {
    this.read = 'Read';
  }
  console.log(`after: ${this.read}`);
  displayLibrary();
};

function addBook(e) {
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

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
  myLibrary.push(newBook);
  console.log(myLibrary);

  modalOff(e);
  displayLibrary();
}

function removeBook(e) {
  let itemIndex = e.target.parentElement.dataset.index;
  console.log(itemIndex);
  myLibrary.splice(itemIndex, 1);
  console.log(myLibrary);
  displayLibrary();
}

function clearLibrary() {
  while (libraryGrid.firstChild) {
    libraryGrid.removeChild(libraryGrid.firstChild);
  }
}

function displayLibrary() {
  clearLibrary();
  displayBooks();
  displayAddBtn();
}

function displayBooks() {
  myLibrary.forEach((book) => {
    let newBook = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let statusBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    bookTitle.className = 'book-card-title';
    bookAuthor.className = 'book-card-text';
    bookPages.className = 'book-card-text';
    statusBtn.className = 'book-card-btn';
    statusBtn.id = 'statusBtn';
    statusBtn.addEventListener('click', book.changeReadStatus.bind(book));
    removeBtn.className = 'book-card-btn';
    removeBtn.id = 'removeBtn';
    removeBtn.addEventListener('click', removeBook);

    if (book.read === 'Read') {
      newBook.className = 'book-card-green';
    } else {
      newBook.className = 'book-card-red';
    }
    newBook.dataset.index = myLibrary.indexOf(book);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `Written by ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    statusBtn.textContent = book.read;
    removeBtn.textContent = 'Remove';

    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(statusBtn);
    newBook.appendChild(removeBtn);
    libraryGrid.appendChild(newBook);
  });
}

function displayAddBtn() {
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
