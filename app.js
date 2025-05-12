import {
	getDataFromApi,
	getBooksByQuery,
	getRandomBooks,
	getTopRatedBooks,
	getBooksByLanguage,
	getBooksByGenre,
	getGenresFromBooks,
} from "./src/components/api.js";
import { getFavorites } from "./src/utils/storage.js";
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

	// Menú - favoritos
	const favoritesMenuItem = document.getElementById("show-favorites");

	if (favoritesMenuItem) {
		favoritesMenuItem.addEventListener("click", () => {
			const favoriteBooksIds = getFavorites();

			if (!favoriteBooksIds || favoriteBooksIds.length === 0) {
				alert("No tienes libros favoritos.");
				return;
			}

			const favoriteBooks = books.filter((book) => favoriteBooksIds.includes(book.key));

			document.querySelectorAll(".section").forEach((section) => (section.style.display = "none"));

			const booksContainer = document.getElementById("books-container");
			if (booksContainer) {
				booksContainer.style.display = "block";
				renderBooks(favoriteBooks);
			}

			// console.log("IDs favoritos:", favoriteBooksIds);
			// console.log("Todos los libros:", books);
			// console.log("Filtrados:", favoriteBooks);
		});
	}
});
