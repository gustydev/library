let library = [{author: 'Gusty', title: "Gusty's Book for Testing the Thing", pages: 42, read: 'no'}];

const bookDisplay = document.querySelector('.main-container');

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