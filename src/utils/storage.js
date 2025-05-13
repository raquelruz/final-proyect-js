/**
 * Obtiene datos desde localStorage
 * @param {*} key 
 * @returns un array vacío si no hay dados guardados con esa clave
 */
export const getFromStorage = (key) => {
	return JSON.parse(localStorage.getItem(key)) || [];
};

const saveToStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};


/**
 * Clave utilizada para almacenar favoritos en localStorage
 */
const favoritesKey = "favorites";

/**
 * Guarda un libro en la lista de favoritos (si no está ya guardado)
 * @param {*} bookId 
 */
export const saveFavorite = (bookId) => {
	let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	if (!favorites.includes(bookId)) {
		favorites.push(bookId);
		localStorage.setItem(favoritesKey, JSON.stringify(favorites));
	}
};

export const isFavorite = (bookId) => {
	const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	return favorites.includes(bookId);
};

export const removeFavorite = (bookId) => {
	let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	favorites = favorites.filter((id) => id !== bookId);
	localStorage.setItem(favoritesKey, JSON.stringify(favorites));
};

export const getFavorites = () => {
	return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const getFavoriteIds = () => getFromStorage("favorites");

export const filterFavorites = (books) => {
	const favs = getFromStorage("favorites");
	return books.filter((book) => favs.includes(book.key));
};


let STORAGE_KEY_READ = "readBooks";
/**
 * Guarda un libro en la lista de leídos (usa clave "readBooks")
 * @param {*} id 
 * @returns 
 */
export const saveRead = (bookId) => {
	let readBooks = getFromStorage(STORAGE_KEY_READ);

	if (!readBooks.includes(bookId)) {
		readBooks.push(bookId);
		saveToStorage(STORAGE_KEY_READ, readBooks);
	}
};

export const isRead = (id) => {
	const readBooks = getFromStorage(STORAGE_KEY_READ);
	return readBooks.includes(id);
};

export const removeRead = (id) => {
	let readBooks = getFromStorage(STORAGE_KEY_READ);
	readBooks = readBooks.filter((bookId) => bookId !== id);
	saveToStorage(STORAGE_KEY_READ, readBooks);
};

export const getRead = () => {
	return getFromStorage(STORAGE_KEY_READ);
};

export const getReadIds = () => getFromStorage(STORAGE_KEY_READ);

export const filterRead = (books) => {
	const readBooks = getFromStorage(STORAGE_KEY_READ);
	return books.filter((book) => readBooks.includes(book.key));
};
