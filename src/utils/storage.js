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


/**
 * Guarda un libro en la lista de leídos (usa clave "readBooks")
 * @param {*} id 
 * @returns 
 */
export const saveRead = (bookId) => {
	let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

	if (!readBooks.includes(bookId)) {
		readBooks.push(bookId);
		localStorage.setItem("readBooks", JSON.stringify(readBooks));
	}
};

export const isRead = (id) => {
	const readList = getFromStorage("read");
	return readList.includes(id);
};

export const removeRead = (id) => {
	let readList = getFromStorage("read");
	readList = readList.filter((read) => read !== id);
	saveToStorage("read", readList);
};

export const getRead = () => {
	const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
	return readBooks;
};

export const getReadIds = () => getFromStorage("read");

export const filterRead = (books) => {
	const readList = getFromStorage("read");
	return books.filter((book) => readList.includes(book.key));
};
