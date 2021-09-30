const libraryGrid = document.querySelector('.library-grid');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const modalForm = document.querySelector('.modal-form');
const errorElement = document.querySelector('#error');

modalForm.addEventListener('submit', addBook);
window.addEventListener('click', modalOff);
closeBtn.addEventListener('click', modalOff);

let myLibrary = [];

window.onload = function () {
  console.log(myLibrary);
  if (!localStorage.getItem('myLibrary')) {
    console.log('no storage');
    defaultBooks();
    addLibraryToStorage();
  } else {
    console.log('yes storage');
    getLibrary();
  }
};

function addLibraryToStorage() {
  localStorage['myLibrary'] = JSON.stringify(myLibrary);
  myLibrary = [];
  getLibrary();
}

function getLibrary() {
  let tempLibrary = JSON.parse(localStorage['myLibrary']);
  for (let i = 0; i < tempLibrary.length; i++) {
    console.log(tempLibrary[i]);
    let book = new Book(
      tempLibrary[i].title,
      tempLibrary[i].author,
      tempLibrary[i].pages,
      tempLibrary[i].read
    );
    myLibrary.push(book);
  }
  console.log(myLibrary);
  displayLibrary();
}

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
  addLibraryToStorage();
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

  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
  myLibrary.push(newBook);
  console.log(myLibrary);
  addLibraryToStorage();
  modalOff(e);
}

function removeBook(e) {
  let itemIndex = e.target.parentElement.dataset.index;
  console.log(itemIndex);
  myLibrary.splice(itemIndex, 1);
  console.log(myLibrary);
  addLibraryToStorage();
}

function defaultBooks() {
  let book1 = new Book('The Blade Itself', 'Joe Abercrombie', 529, 'Read');
  let book2 = new Book('Best Served Cold', 'Joe Abercrombie', 534, 'Read');
  let book3 = new Book('A Little Hatred', 'Joe Abercrombie', 471, 'To-Read');

  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
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
