import {
	getDataFromApi,
	getBooksByQuery,
	getRandomBooks,
	getTopRatedBooks,
	getBooksByLanguage
} from "./src/components/api.js";
import { getFavorites, getRead } from "./src/utils/storage.js";
import {
	renderBooksSection,
	renderBooks,
	renderFavoriteBooks,
	renderReadBooks
} from "./src/helpers/render.js";

/**
 * Variable global que contendrá todos los libros cargados desde la API
 */
export let books = [];

document.addEventListener("DOMContentLoaded", async () => {
	// console.log("JavaScript funcionando y DOM cargado");

	// ------------ CONTROL DE USUARIO LOGUEADO ------------
	/**
	 * Comprueba si hay un usuario logueado, si no, redirige al login
	 */
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (!currentUser) {
		window.location.href = "login.html";
		return;
	}

	/**
	 * Permite cerrar el usuario eliminando el usuario actual del localStorage
	 */
	document.getElementById("logout-btn").addEventListener("click", () => {
		localStorage.removeItem("currentUser");
		window.location.href = "login.html";
	});

	// ------------ MENÚ LATERAL ------------
	const menuBtn = document.querySelector(".icon-menu");
	const sidebar = document.querySelector(".sidebar");
	if (menuBtn && sidebar) {
		menuBtn.addEventListener("click", () => {
			sidebar.classList.toggle("active");
		});
	}

	// ------------ BUSCADOR ------------
	const searchBtn = document.getElementById("search-btn");
	const searchInput = document.getElementById("search-input");
	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const query = searchInput.value.trim();
			if (query) getDataFromApi(query);
		});
	}

	// ------------ CARGAR LIBROS AL INICIO ------------
	/**
	 * Obtiene todos los libros al cargar la página
	 */
	books = await getDataFromApi();

	if (books?.length > 0) {
		renderBooksSection(getRandomBooks(books, 8), "recommendations-section");
		renderBooksSection(getTopRatedBooks(books).slice(0, 8), "top-rated-section");
		renderBooksSection(getBooksByLanguage(books).slice(0, 8), "other-languages-section");
	}

	// ------------ SECCIONES DEL MENÚ: FAVORITOS Y LEÍDOS ------------
	/**
	 * Oculta las secciones antes de mostrar una nueva
	 */
	const hideAllSections = () => {
		document.querySelectorAll(".section").forEach((section) => (section.style.display = "none"));
	};

	/**
	 * Muestra la sección de libros favoritos
	 */
	const showFavorites = () => {
		hideAllSections();

		const favoriteBooksIds = getFavorites();
		if (favoriteBooksIds.length === 0) {
			alert("No tienes libros favoritos.");
			return;
		}

		const favoriteBooks = books.filter((book) => favoriteBooksIds.includes(book.key));
		renderFavoriteBooks(favoriteBooks);

		document.getElementById("favorites-section").style.display = "block";
	};

	/**
	 * Muestra la sección de libros leídos
	 */
	const showReadBooks = () => {
		hideAllSections();

		const readBooksIds = getRead();
		if (readBooksIds.length === 0) {
			alert("No tienes libros leídos.");
			return;
		}

		const readBooks = books.filter((book) => readBooksIds.includes(book.key));
		renderReadBooks(readBooks);

		document.getElementById("read-section").style.display = "block";
	};

	/**
	 * Asocia los botones del menú lateral a sus respectivas funciones
	 */
	const favoriteMenuItem = document.getElementById("show-favorites");
	if (favoriteMenuItem) {
		favoriteMenuItem.addEventListener("click", showFavorites);
	}

	const readMenuItem = document.getElementById("show-read");
	if (readMenuItem) {
		readMenuItem.addEventListener("click", showReadBooks);
	}
});
