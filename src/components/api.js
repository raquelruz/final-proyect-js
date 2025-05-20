import { renderBooks, renderBooksSection } from "../helpers/render.js";
import {
	saveFavorite,
	removeFavorite,
	isFavorite,
	saveRead,
	removeRead,
	isRead,
	filterFavorites,
	filterRead,
} from "../utils/storage.js";

export const getDataFromApi = async (query = "libros") => {
	try {
		const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&language=spa`);
		if (!response.ok) throw new Error("Error al obtener datos");

		const data = await response.json();
		console.log("Datos obtenidos:", data);

		if (data.docs && data.docs.length > 0) {
			return data.docs;
		} else {
			console.warn("No se obtuvieron libros válidos desde la API.");
			return [];
		}
	} catch (error) {
		console.error("Hubo un error:", error.message);
		return [];
	}
};

// getDataFromApi();

export const getBooksByQuery = async (query, containerId) => {
	try {
		const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&language=spa`);
		if (!response.ok) throw new Error("Error al obtener datos");

		const data = await response.json();
		console.log(`Datos para sección "${query}":`, data);

		renderBooks(data.docs.slice(0, 10), containerId);
	} catch (error) {
		console.error(`Error al obtener datos para sección ${query}:`, error.message);
	}
};

// getBooksByQuery();

export async function advancedSearch({ title, author, subject, year, language, sort }) {
	const baseUrl = "https://openlibrary.org/search.json";
	const params = new URLSearchParams();

	if (title) params.append("title", title);
	if (author) params.append("author", author);
	if (subject) params.append("subject", subject);
	if (year) params.append("first_publish_year", year);
	if (language) params.append("language", language);

	params.append("limit", "30");

	const url = `${baseUrl}?${params.toString()}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		let books = data.docs;

		// Ordenar si se seleccionó una opción
		if (sort) {
			books.sort((a, b) => {
				const valueA = a[sort] || "";
				const valueB = b[sort] || "";
				return valueA > valueB ? 1 : -1;
			});
		}

		return books;
	} catch (error) {
		console.error("Error en búsqueda avanzada:", error);
		return [];
	}
}

export const searchBySubject = async (subject) => {
	const url = `https://openlibrary.org/subjects/${subject}.json?limit=20`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.works || []; // los libros están en 'works'
	} catch (error) {
		console.error("Error en búsqueda por subject:", error);
		return [];
	}
};

export const getRandomBooks = (books, count = 10) => {
	const shuffled = [...books].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

export const getTopRatedBooks = (books) => {
	const filtered = books.filter((book) => book.average_rating).sort((a, b) => b.average_rating - a.average_rating);
	const lastElements = books.slice(-4);

	if (filtered.length) {
		return filtered;
	}
	return lastElements;
};

export const getBooksByLanguage = (books, language = "Spanish") => {
	return books.filter((book) => book.language && book.language !== language);
};

export const toggleFavorite = (bookId) => {
	if (isFavorite(bookId)) {
		removeFavorite(bookId);
	} else {
		saveFavorite(bookId);
	}
};

export const toggleRead = (bookId) => {
	if (isRead(bookId)) {
		removeRead(bookId);
	} else {
		saveRead(bookId);
	}
};
