let library = [];

const bookDisplay = document.querySelector('.books');
const addButton = document.querySelector('.book-add');
const docBody = document.querySelector('body');

function Book(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function() {
        if (this.read) {
            return this.read = false;
        } else {
            return this.read = true;
        }
    }
}

function addBook(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read);
    library.push(newBook);
    updateLibrary();
}

function updateLibrary() {
    bookDisplay.innerHTML = ''; // Avoiding duplicates
    library.forEach((book, index) => {
      let newBook = document.createElement('div');
      newBook.classList.add('book');
      newBook.id = `${index}`;
        for (const info in book) {
            if (!(info === 'toggleRead')) {
                if (info === 'read') {
                    let bookInfo = document.createElement('div');
                    bookInfo.classList.add(`${info}`);
                    bookInfo.id = 'read-toggle'
                    if (book[info] === true) {
                        bookInfo.classList.add('book-read');
                        bookInfo.innerHTML = 'Read';
                    } else {
                        bookInfo.classList.add('not-read');
                        bookInfo.innerHTML = 'Not Read';
                    }
                    bookInfo.addEventListener('click', () => {
                        book.toggleRead();
                        updateLibrary();
                    })
                    newBook.appendChild(bookInfo);
                } else {
                    let bookInfo = document.createElement(`div`);
                    bookInfo.classList.add(`${info}`);
                    bookInfo.innerHTML = `<strong style='text-transform:capitalize;'>${info}</strong>: ${book[info]}`
                    newBook.appendChild(bookInfo);
                }
            }
        }
        let bookDelete = document.createElement('button');
        bookDelete.classList.add('book-delete')
        bookDelete.innerHTML = "<img src='images/delete-outline.png' alt='delete book'>";
        bookDelete.addEventListener('click', () => {
            library.pop(index);
            bookDisplay.removeChild(newBook);
        })
        newBook.prepend(bookDelete);
        bookDisplay.appendChild(newBook);
})
};

const bookForm = document.querySelector('form');
const submit = document.querySelector('button#submit');
const cancel = document.querySelector('button.cancel-form');

addButton.addEventListener('click', () => {
    if (!bookForm.style.display) {
        bookForm.style.display = 'grid';
    };
});

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (bookForm.checkValidity()) {
        addBook(author.value, title.value, pages.value, read.checked);
        bookForm.style.display = '';
        bookForm.reset();
    } else {
        alert('Please fill at least the first three fields.');
    }
})

cancel.addEventListener('click', (e) => {
    e.preventDefault();
    bookForm.style.display = '';
})