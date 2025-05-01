import { getDataFromApi } from "./src/components/api.js";
// import { render } from ".src/helpers/render.js"

document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	// Verificar sesión
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {
		// Insertar saludo y botón de cerrar sesión
		const header = document.createElement("div");
		header.innerHTML = `
			<p>Bienvenido, ${currentUser.nombre}</p>
			<button id="logout-btn">Cerrar sesión</button>
		`;
		document.body.prepend(header);

		// Agregar evento al botón de cerrar sesión
		document.getElementById("logout-btn").addEventListener("click", () => {
			localStorage.removeItem("currentUser");
			window.location.href = "login.html";
		});
	} else {
		// Redirige si no hay sesión iniciada
		window.location.href = "login.html";
		return; // Detiene el resto del código
	}

	// Búsqueda de libros
	const searchInput = document.getElementById("books-search");
	const searchBtn = document.getElementById("search-btn");
	const searchContainer = document.querySelector(".search-container");

	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", async (e) => {
			e.preventDefault();

			const query = searchInput.value.trim();
			if (query) {
				const books = await getDataFromApi(query);

				searchContainer.innerHTML = ""; 

				renderBooks(books, searchContainer);
			}
		});
	} else {
		console.warn("No se encontró el botón o input de búsqueda");
	}
});

// function renderBooks(books, container) {
// 	if (!books || books.length === 0) {
// 		container.innerHTML = '<p>No se encontraron libros.</p>';
// 		return;
// 	}

// 	// Crear una lista de libros (puedes personalizar esto según la estructura de tus datos)
// 	books.forEach((book) => {
// 		const bookElement = document.createElement("div");
// 		bookElement.classList.add("book-item");

// 		bookElement.innerHTML = `
// 			<h3>${book.title}</h3>
// 			<p>${book.author}</p>
// 			<button class="add-to-favs">Añadir a favoritos</button>
// 		`;

// 		container.appendChild(bookElement);
// 	});
// }
