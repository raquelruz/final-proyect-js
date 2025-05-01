import { getDataFromApi } from "./src/components/api.js";
// import { saveBook, getBooks, deleteBooks, updateBook } from "./src/utils/storage.js";
// import { render } from ".src/helpers/render.js"

document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	const searchInput = document.getElementById("books-search");
	const searchBtn = document.getElementById("search-btn");
	const searchContainer = document.querySelector(".search-container");

	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", async (e) => {
			e.preventDefault(); 

			const query = searchInput.value.trim();
			if (query) {
				const books = await getDataFromApi(query);

				searchContainer.innerHTML = ''; 

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