let library = [{author: 'Gusty', title: "Gusty's Book for Testing the Thing", pages: 42, read: false}];

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
    library.forEach(book => {
      let newBook = document.createElement('div.book');
        for (const info in book) {
            let bookInfo = document.createElement(`div.${info}`);
            bookInfo.textContent = `${info}: ${book[info]}`
            newBook.appendChild(bookInfo);
        }
        bookDisplay.appendChild(newBook);
})
};

updateLibrary();