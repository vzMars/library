const libraryGrid = document.querySelector('.library-grid');
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {}

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
  let addDiv = document.createElement('div');
  let addIcon = document.createElement('i');
  addIcon.className = 'fa fa-plus fa-5x';
  addDiv.className = 'add-card';
  addDiv.appendChild(addIcon);
  libraryGrid.appendChild(addDiv);
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const book1 = new Book('The Blade Itself', 'Joe Abercrombie', 529, 'Read');
const book2 = new Book('Best Served Cold', 'Joe Abercrombie', 534, 'Read');
const book3 = new Book('A Little Hatred', 'Joe Abercrombie', 471, 'To-Read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
displayLibrary();
