import { renderBooks, renderBooksSection } from "../helpers/render.js";

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
}

getDataFromApi();

export const getGenresFromBooks = (books) => {
	const genresSet = new Set();

	books.forEach((book) => {
		if (book.subject) {
			book.subject.forEach((subject) => {
				genresSet.add(subject);
			});
		}
	});

	return Array.from(genresSet);
};

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

export const getRandomBooks = (books, count = 10) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getTopRatedBooks = (books) => {
    return books.filter((book) => book.average_rating).sort((a, b) => b.average_rating - a.average_rating);
};

export const getBooksByLanguage = (books, language = "Spanish") => {
    return books.filter(book => book.language && book.language !== language);
}

export const getBooksByGenre = (books, genre) => {
    return books.filter(book => book.genre && book.genre.includes(genre));
}