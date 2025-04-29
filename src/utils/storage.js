const STORAGE_KEY = "miBibliotecaLibros";

export const saveBook = (book) => {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    books.push(book);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const getBooks = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const deleteBooks = (id) => {
    const books = getBooks().filter(book => book.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const updateBook = (updateBook) => {
    const books = getBooks().map(book => (book.id === updateBook.id ? updateBook : book));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}