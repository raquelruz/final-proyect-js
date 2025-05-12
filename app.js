import {
	getDataFromApi,
	getBooksByQuery,
	getRandomBooks,
	getTopRatedBooks,
	getBooksByLanguage,
	getBooksByGenre,
	getGenresFromBooks,
} from "./src/components/api.js";

import { getFavoriteIds } from "./src/utils/storage.js";

import { renderBooksSection } from "./src/helpers/render.js";

export let books = [];

document.addEventListener("DOMContentLoaded", async () => {
	console.log("JavaScript funcionando y DOM cargado");

	// Comprobación de usuario
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {

		document.getElementById("logout-btn").addEventListener("click", () => {
			localStorage.removeItem("currentUser");
			window.location.href = "login.html";
		});
	} else {
		window.location.href = "login.html";
		return;
	}

	// Botón de menú para mostrar el sidebar
	const menuBtn = document.querySelector(".icon-menu");
	const sidebar = document.querySelector(".sidebar");

	if (menuBtn && sidebar) {
		menuBtn.addEventListener("click", () => {
			console.log("Click en el menú");
			sidebar.classList.toggle("active");
		});
	} else {
		console.warn("No se encontró el botón del menú o el sidebar");
	}

	// Búsqueda de libros
	const searchBtn = document.getElementById("search-btn");
	const searchInput = document.getElementById("search-input");

	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const query = searchInput.value.trim();
			if (query) getDataFromApi(query);
		});
	}

	// Secciones al inicio
	books = await getDataFromApi();

	if (books?.length > 0) {
		renderBooksSection(getRandomBooks(books, 4), "recommendations-section");
		renderBooksSection(getTopRatedBooks(books).slice(0, 4), "top-rated-section");
		renderBooksSection(getBooksByLanguage(books).slice(0, 4), "other-languages-section");
		// renderBooksSection(getBooksByGenre(books, "Fiction").slice(0, 10), "genre-section");

		// Crear secciones por género automáticamente
		const genres = getGenresFromBooks(books);
		genres.forEach((genre) => {
			const booksByGenre = books.filter((book) => book.subject && book.subject.includes(genre));

			const containerId = genre.toLowerCase().replace(/\s+/g, "-") + "-section";

			let container = document.getElementById(containerId);
			if (!container) {
				container = document.createElement("div");
				container.id = containerId;
				document.body.appendChild(container); 
			}

			renderBooksSection(booksByGenre.slice(0, 6), containerId);
		});
	}

	const favoritesBtn = document.getElementById("ver-favoritos");
	if (!favoritesBtn) return;

	favoritesBtn.addEventListener("click", async () => {
		const allBooks = await getDataFromApi("libros");
		const favoriteIds = getFavoriteIds();
		const favoriteBooks = allBooks.filter(book => favoriteIds.includes(book.key));

		const favoritesSection = document.getElementById("favs-section");
		if (favoritesSection) {
			renderBooksSection(favoriteBooks, "fav-section");
			favoriteBooks.scrollIntoView({ behavior: "smooth"});
		}
	})
});
