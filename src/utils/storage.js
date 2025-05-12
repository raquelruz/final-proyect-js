export const getFromStorage = (key) => {
	return JSON.parse(localStorage.getItem(key)) || [];
};

const saveToStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

const favoritesKey = 'favorites';

export const saveFavorite = (bookId) => {
	let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	if (!favorites.includes(bookId)) {
		favorites.push(bookId);
		localStorage.setItem(favoritesKey, JSON.stringify(favorites));
	}
};

export const removeFavorite = (bookId) => {
	let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	favorites = favorites.filter((id) => id !== bookId);
	localStorage.setItem(favoritesKey, JSON.stringify(favorites));
};

export const isFavorite = (bookId) => {
	const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
	return favorites.includes(bookId);
};

export const getFavorites = () => {
	return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const getFavoriteIds = () => getFromStorage("favorites");

export const filterFavorites = (books) => {
	const favs = getFromStorage("favorites");
	return books.filter((book) => favs.includes(book.key));
};


export const isRead = (id) => {
	const readList = getFromStorage("read");
	return readList.includes(id);
};

export const saveRead = (id) => {
	const readList = getFromStorage("read");
	if (!readList.includes(id)) {
		readList.push(id);
		saveToStorage("read", readList);
	}
};

export const removeRead = (id) => {
	let readList = getFromStorage("read");
	readList = readList.filter((read) => read !== id);
	saveToStorage("read", readList);
};

export const getReadIds = () => getFromStorage("read");

export const filterRead = (books) => {
	const readList = getFromStorage("read");
	return books.filter((book) => readList.includes(book.key));
};
