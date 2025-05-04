const getFromStorage = (key) => {
	return JSON.parse(localStorage.getItem(key)) || [];
};

const saveToStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const saveFavorite = (id) => {
	const favs = getFromStorage("favorites");
	if (!favs.includes(id)) {
		favs.push(id);
		saveToStorage("favorites", favs);
	}
};

export const removeFavorite = (id) => {
	let favs = getFromStorage("favorites");
	favs = favs.filter((fav) => fav !== id);
	saveToStorage("favorites", favs);
};

export const isFavorite = (id) => {
	const favs = getFromStorage("favorites");
	return favs.includes(id);
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
