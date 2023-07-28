let library = [{author: 'Gusty', title: "Gusty's Book", pages: 420, read: 'no'}];

const bookDisplay = document.querySelector('.books');
const addButton = document.querySelector('.book-add');
const docBody = document.querySelector('body');

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBook(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read);
    library.push(newBook);
    updateLibrary();
}

function updateLibrary() {
    bookDisplay.innerHTML = ''; // Avoiding duplicates
    library.forEach(book => {
      let newBook = document.createElement('div');
      newBook.classList.add('book');
        for (const info in book) {
            let bookInfo = document.createElement(`div`);
            bookInfo.classList.add(`${info}`);
            bookInfo.innerHTML = `<strong>${info}</strong>: ${book[info]}`
            newBook.appendChild(bookInfo);
        }
        bookDisplay.appendChild(newBook);
})
};

updateLibrary(); // Might delete later when add button is on the page?

addButton.addEventListener('click', () => {
    const infoList = ['author', 'title', 'pages', 'read'];
    const bookForm = document.createElement('form');
    infoList.forEach(info => {
        let label = document.createElement('label')
        let input = document.createElement('input');
        label.setAttribute('for', `${info}`);
        label.textContent = `${info}:`
        input.required = true;
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
        let readCheck
        if (read.checked === true) {
            readCheck = 'yes'
        } else {
            readCheck = 'no'
        }
        addBook(author.value, title.value, pages.value, readCheck);
        docBody.removeChild(bookForm);
    })
    bookForm.appendChild(submit);
    docBody.appendChild(bookForm);
})