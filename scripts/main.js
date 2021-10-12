const libraryGrid = document.querySelector('.library-grid');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const modalForm = document.querySelector('.modal-form');

window.addEventListener('click', (event) => {
  displayControl.modalOff(event);
});

closeBtn.addEventListener('click', (event) => {
  displayControl.modalOff(event);
});

modalForm.addEventListener('submit', (event) => {
  myLibrary.addBook(event);
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    if (this.read === 'Read') {
      this.read = 'To-Read';
    } else {
      this.read = 'Read';
    }
    displayControl.addLibraryToStorage();
  }
}

class Library {
  constructor() {
    this.library = [];
  }

  clearLibraryCollection() {
    this.library = [];
  }

  addBook(event) {
    event.preventDefault();
    let bookReadStatus;

    if (read.checked) {
      bookReadStatus = 'Read';
    } else {
      bookReadStatus = 'To-Read';
    }
    const newBook = new Book(
      title.value,
      author.value,
      pages.value,
      bookReadStatus
    );
    this.library.push(newBook);
    displayControl.addLibraryToStorage();
    displayControl.modalOff(event);
  }

  removeBook(event) {
    let itemIndex = event.target.parentElement.dataset.index;
    this.library.splice(itemIndex, 1);
    displayControl.addLibraryToStorage();
  }

  defaultBooks() {
    const book1 = new Book('The Blade Itself', 'Joe Abercrombie', 529, 'Read');
    const book2 = new Book('Best Served Cold', 'Joe Abercrombie', 534, 'Read');
    const book3 = new Book(
      'A Little Hatred',
      'Joe Abercrombie',
      471,
      'To-Read'
    );

    this.library.push(book1);
    this.library.push(book2);
    this.library.push(book3);
  }
}

class DisplayController {
  checkStorage() {
    if (!localStorage.getItem('myLibrary')) {
      myLibrary.defaultBooks();
      this.addLibraryToStorage();
    } else {
      this.getLibrary();
    }
  }

  addLibraryToStorage() {
    localStorage['myLibrary'] = JSON.stringify(myLibrary.library);
    myLibrary.clearLibraryCollection();
    this.getLibrary();
  }

  getLibrary() {
    let tempLibrary = JSON.parse(localStorage['myLibrary']);
    for (let i = 0; i < tempLibrary.length; i++) {
      const book = new Book(
        tempLibrary[i].title,
        tempLibrary[i].author,
        tempLibrary[i].pages,
        tempLibrary[i].read
      );
      myLibrary.library.push(book);
    }
    this.displayLibrary();
  }

  displayLibrary() {
    this.clearLibrary();
    this.displayBooks();
    this.displayAddBtn();
  }

  clearLibrary() {
    while (libraryGrid.firstChild) {
      libraryGrid.removeChild(libraryGrid.firstChild);
    }
  }

  displayBooks() {
    myLibrary.library.forEach((book) => {
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
      removeBtn.addEventListener('click', (event) => {
        myLibrary.removeBook(event);
      });

      if (book.read === 'Read') {
        newBook.className = 'book-card-green';
      } else {
        newBook.className = 'book-card-red';
      }
      newBook.dataset.index = myLibrary.library.indexOf(book);

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

  displayAddBtn() {
    let addCard = document.createElement('div');
    let addIcon = document.createElement('i');
    addIcon.className = 'fa fa-plus fa-5x';
    addCard.className = 'add-card';
    addCard.addEventListener('click', this.modalOn);
    addCard.appendChild(addIcon);
    libraryGrid.appendChild(addCard);
  }

  clearForm() {
    modalForm.reset();
  }

  modalOn() {
    modal.className = 'modal on';
  }

  modalOff(event) {
    if (
      event.target.className === 'modal on' ||
      event.target.className === 'closeBtn' ||
      event.type === 'submit'
    ) {
      modal.className = 'modal off';
      this.clearForm();
    }
  }
}

const myLibrary = new Library();
const displayControl = new DisplayController();
displayControl.checkStorage();
