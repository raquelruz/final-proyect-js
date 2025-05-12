import {
	getDataFromApi,
	getBooksByQuery,
	getRandomBooks,
	getTopRatedBooks,
	getBooksByLanguage,
	getBooksByGenre,
	getGenresFromBooks,
} from "./src/components/api.js";
import { getFavorites, getRead } from "./src/utils/storage.js";
import { renderBooksSection, renderBooks } from "./src/helpers/render.js";

export let books = [];

document.addEventListener("DOMContentLoaded", async () => {
	console.log("JavaScript funcionando y DOM cargado");

	// Comprobación de usuario
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (!currentUser) {
		window.location.href = "login.html";
		return;
	}

	document.getElementById("logout-btn").addEventListener("click", () => {
		localStorage.removeItem("currentUser");
		window.location.href = "login.html";
	});

	// Menú
	const menuBtn = document.querySelector(".icon-menu");
	const sidebar = document.querySelector(".sidebar");
	if (menuBtn && sidebar) {
		menuBtn.addEventListener("click", () => {
			sidebar.classList.toggle("active");
		});
	}

	// Buscador
	const searchBtn = document.getElementById("search-btn");
	const searchInput = document.getElementById("search-input");
	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const query = searchInput.value.trim();
			if (query) getDataFromApi(query);
		});
	}

	// Cargar todos los libros
	books = await getDataFromApi();

	if (books?.length > 0) {
		renderBooksSection(getRandomBooks(books, 4), "recommendations-section");
		renderBooksSection(getTopRatedBooks(books).slice(0, 4), "top-rated-section");
		renderBooksSection(getBooksByLanguage(books).slice(0, 4), "other-languages-section");

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

	// MENÚ - FAVORITOS Y LEIDOS
	const hideAllSections = () => {
		document.querySelectorAll(".section").forEach((section) => (section.style.display = "none"));
	};

	const showFavorites = () => {
		hideAllSections();

		const favoriteBooksIds = getFavorites();
		if (favoriteBooksIds.length === 0) {
			alert("No tienes libros favoritos.");
			return;
		}

		const favoriteBooks = books.filter((book) => favoriteBooksIds.includes(book.key));
		renderBooks(favoriteBooks);

		document.getElementById("books-container").style.display = "block";
	};

	
	const showReadBooks = () => {
		hideAllSections(); 

		const readBooksIds = getRead();
		if (readBooksIds.length === 0) {
			alert("No tienes libros leídos.");
			return;
		}

		const readBooks = books.filter((book) => readBooksIds.includes(book.key));
		renderBooks(readBooks);

		document.getElementById("books-container").style.display = "block"; 
	};

	const favoriteMenuItem = document.getElementById("show-favorites");
	if (favoriteMenuItem) {
		favoriteMenuItem.addEventListener("click", showFavorites);
	}

	const readMenuItem = document.getElementById("show-read");
	if (readMenuItem) {
		readMenuItem.addEventListener("click", showReadBooks);
	}
});
