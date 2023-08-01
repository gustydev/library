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
        if (this.read === 'yes') {
            return this.read = 'no';
        } else {
            return this.read = 'yes';
        }
    }
}

function addBook(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read);
    console.log(newBook);
    console.log(Object.getPrototypeOf(newBook))
    library.push(newBook);
    updateLibrary();
}

addBook("Gusty's Book", 'Gusty', 420,'no');

function updateLibrary() {
    bookDisplay.innerHTML = ''; // Avoiding duplicates
    library.forEach((book, index) => {
      let newBook = document.createElement('div');
      newBook.classList.add('book');
      newBook.id = `${index}`;
        for (const info in book) {
            if (!(info === 'toggleRead')) {
                let bookInfo = document.createElement(`div`);
                bookInfo.classList.add(`${info}`);
                bookInfo.innerHTML = `<strong style='text-transform:capitalize;'>${info}</strong>: ${book[info]}`
                newBook.appendChild(bookInfo);
            }
        }
        let bookDelete = document.createElement('button');
        bookDelete.classList.add('book-delete')
        bookDelete.textContent = 'X'
        bookDelete.addEventListener('click', () => {
            library.pop(index);
            bookDisplay.removeChild(newBook);
        })
        let toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.textContent = 'R'
        toggleButton.addEventListener('click', () => {
            book.toggleRead();
            updateLibrary(); // apparently this is fine...?
        })
        newBook.prepend(toggleButton)
        newBook.prepend(bookDelete);
        bookDisplay.appendChild(newBook);
})
};

addButton.addEventListener('click', () => {
    const infoList = ['title', 'author', 'pages', 'read'];
    const bookForm = document.createElement('form');
    bookForm.id = ('book-form');
    infoList.forEach(info => {
        let label = document.createElement('label')
        let input = document.createElement('input');
        label.setAttribute('for', `${info}`);
        label.textContent = `${info}*:`
        if (!(info === 'read')) {
            input.required = true;
        }
        input.setAttribute('id', `${info}`);
        input.setAttribute('name', `${info}`);
        if (info === 'pages') {
            input.setAttribute('type', 'number');
        } else if (info === 'read') {
            input.setAttribute('type', 'checkbox');
            label.textContent = 'read?'
        } else {
            input.setAttribute('type', 'text');
        }
        bookForm.appendChild(label);
        bookForm.appendChild(input);
    })
    let submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = 'Add';
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let readCheck;
        if (read.checked) {
            readCheck = 'yes';
        } else {
            readCheck = 'no';
        }
        if (bookForm.checkValidity()) {
            addBook(author.value, title.value, pages.value, readCheck);
            docBody.removeChild(bookForm);
        } else {
            alert('Please fill all of the required (*) fields.');
        }
    })
    let cancel = document.createElement('button');
    cancel.classList.add('cancel-form');
    cancel.textContent = 'X'
    cancel.addEventListener('click', () => {
        docBody.removeChild(bookForm);
    })
    bookForm.appendChild(submit);
    bookForm.appendChild(cancel);
    if (!docBody.contains(document.getElementById('book-form'))) {
        docBody.appendChild(bookForm);
    }
})