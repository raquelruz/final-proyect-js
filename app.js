import {
	getDataFromApi,
	getBooksByQuery,
	getRandomBooks,
	getTopRatedBooks,
	getBooksByLanguage,
	advancedSearch,
	searchBySubject,
} from "./src/components/api.js";
import {
	getFavorites,
	getRead,
	saveSearchToHistory,
	getSearchHistory,
	clearSearchHistory,
} from "./src/utils/storage.js";
import { renderBooksSection, renderBooks, renderFavoriteBooks, renderReadBooks } from "./src/helpers/render.js";

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
	const searchForm = document.getElementById("search-form");
	const searchInput = document.getElementById("search-input");

	if (searchForm && searchInput) {
		searchForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			const query = searchInput.value.trim();
			if (query) {
				const booksFound = await getDataFromApi(query);
				document.querySelectorAll(".section").forEach((section) => (section.style.display = "none"));
				document.getElementById("search-results-section").style.display = "block";
				renderBooks(booksFound);
			}
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
	 *
	 * @returns muestra la sección "Mi perfil"
	 */
	const showProfile = () => {
		hideAllSections();

		const profileSection = document.getElementById("profile-section");
		if (!profileSection) return;

		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (!currentUser) {
			alert("No estás logueado.");
			window.location.href = "login.html";
			return;
		}

		document.getElementById("profile-name").textContent = currentUser.name || "Usuario";
		document.getElementById("profile-email").textContent = currentUser.email || "Sin email";
		document.getElementById("profile-registered").textContent = currentUser.registeredDate || "Fecha desconocida";

		const favoriteBooksIds = getFavorites();
		const readBooksIds = getRead();

		document.getElementById("fav-count").textContent = favoriteBooksIds.length;
		document.getElementById("read-count").textContent = readBooksIds.length;

		profileSection.style.display = "block";
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

	const profileMenuItem = document.getElementById("show-profile");
	if (profileMenuItem) {
		profileMenuItem.addEventListener("click", showProfile);
	}

	// ------------ BUSQUEDA AVANZADA ------------
	document.querySelector("#advanced-search-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		const title = document.querySelector("#title").value.trim();
		const author = document.querySelector("#author").value.trim();
		const subject = document.querySelector("#subject").value.trim();
		const year = document.querySelector("#year").value.trim();
		const language = document.querySelector("#language").value;
		const sort = document.querySelector("#sort").value;

		const searchParams = { title, author, subject, year, language, sort };

		saveSearchToHistory(searchParams);

		const results = await advancedSearch(searchParams);
		renderBooks(results);
		renderSearchHistory(); // Actualiza historial
	});

	// ------------ HISTORIAL DE BÚSQUEDA ------------
	const renderSearchHistory = () => {
		const container = document.querySelector("#search-history");
		const history = getSearchHistory();

		container.innerHTML = "";

		if (history.length === 0) {
			container.innerHTML = "<p>No hay búsquedas guardadas.</p>";
			return;
		}

		history.forEach((item) => {
			const btn = document.createElement("button");
			btn.textContent = `${item.title || "Sin título"} - ${item.author || "Autor desconocido"}`;
			btn.classList.add("history-btn");

			btn.addEventListener("click", async () => {
				const results = await advancedSearch(item);
				renderBooks(results);
			});

			container.appendChild(btn);
		});
	};

	document.querySelector("#clear-history-btn").addEventListener("click", () => {
		clearSearchHistory();
		renderSearchHistory();
	});

	renderSearchHistory();
});

// ------------ GÉNEROS ------------
const genreContainer = document.querySelector("#genre-sections-container");

document.querySelectorAll(".footer-links-container a").forEach((link) => {
	link.addEventListener("click", async (e) => {
		e.preventDefault();

		const subject = e.target.dataset.subject;
		const displayName = e.target.textContent;

		if (!subject) return;

		const results = await searchBySubject(subject);

		document.getElementById("recommendations").style.display = "none";
		document.getElementById("top-rated").style.display = "none";
		document.getElementById("other-languages").style.display = "none";

		genreContainer.style.display = "block";

		document.querySelectorAll(".genre-section").forEach((section) => {
			section.style.display = "none";
		});

		let section = document.querySelector(`#genre-${subject}`);

		if (!section) {
			section = document.createElement("section");
			section.classList.add("genre-section", subject.toLowerCase());
			section.id = `genre-${subject}`;

			const title = document.createElement("h2");
			title.textContent = displayName;
			section.appendChild(title);

			const booksContainer = document.createElement("div");
			booksContainer.classList.add("books-genre-container");
			section.appendChild(booksContainer);

			genreContainer.appendChild(section);
		}

		section.style.display = "block";

		const booksContainer = section.querySelector(".books-genre-container");
		booksContainer.innerHTML = "";
		renderBooks(results, booksContainer);
	});
});

// -------- MODAL: EDITAR PERFIL --------
const editProfileBtn = document.getElementById("edit-profile-btn");
const editModal = document.getElementById("edit-profile-modal");
const closeEditModal = document.getElementById("close-edit-modal");
const editForm = document.getElementById("edit-profile-form");

if (editProfileBtn && editModal && closeEditModal && editForm) {
	editProfileBtn.addEventListener("click", () => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (!currentUser) return;

		document.getElementById("edit-name").value = currentUser.name || "";
		document.getElementById("edit-email").value = currentUser.email || "";

		editModal.style.display = "block";
	});

	closeEditModal.addEventListener("click", () => {
		editModal.style.display = "none";
	});

	window.addEventListener("click", (e) => {
		if (e.target === editModal) {
			editModal.style.display = "none";
		}
	});

	editForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const updatedName = document.getElementById("edit-name").value.trim();
		const updatedEmail = document.getElementById("edit-email").value.trim();

		let currentUser = JSON.parse(localStorage.getItem("currentUser"));
		currentUser.name = updatedName;
		currentUser.email = updatedEmail;

		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		document.getElementById("profile-name").textContent = updatedName;
		document.getElementById("profile-email").textContent = updatedEmail;

		editModal.style.display = "none";
		alert("Perfil actualizado correctamente.");
	});
}