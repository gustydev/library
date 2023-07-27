let library = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBook(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read);
    library.push(newBook);
}