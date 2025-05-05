import { isFavorite, saveFavorite, removeFavorite, isRead, saveRead, removeRead } from "../utils/storage.js";

export const renderBooks = (books) => {
	const booksContainer = document.getElementById("books-container");
	booksContainer.innerHTML = "";

	books.forEach((book) => booksContainer.appendChild(createBookCard(book)));
};

export const renderBooksSection = (books, containerId) => {
	const sectionContainer = document.getElementById(containerId);

	if (!sectionContainer) return;
	sectionContainer.innerHTML = "";

	if (books.length === 0) {
		sectionContainer.innerHTML = "<p>No se encontraron libros para mostrar.</p>";
		return;
	}

	books.forEach((book) => {
		const bookCard = createBookCard(book);
		if (bookCard) {
			sectionContainer.appendChild(bookCard);
		}
	});
};

const createBookCard = (book) => {
	const bookCard = document.createElement("div");
	bookCard.classList.add("book-card");

	const id = book.key;
	const title = book.title || "Titulo no disponible";
	const author = book.author_name ? book.author_name.join(", ") : "Autor desconocido";
	const year = book.first_publish_year || "Año no disponible";
	const coverId = book.cover_i ? book.cover_i : null;
	const imageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "./media/images/imagen-no-disponible.jpg";

	bookCard.innerHTML = `
		<img src="${imageUrl}" alt="Portada de ${title}" class="book-image">
		<h3>${title}</h3>
		<p><strong>Autor:</strong> ${author}</p>
		<p><strong>Año de publicación:</strong> ${year}</p>
	`;

	const favBtn = document.createElement("button");
	favBtn.textContent = isFavorite(id) ? "Eliminar de favoritos" : "Añadir a favoritos";
	favBtn.addEventListener("click", () => {
		if (isFavorite(id)) {
			removeFavorite(id);
			favBtn.textContent = "Añadir a favoritos";
		} else {
			saveFavorite(id);
			favBtn.textContent = "Eliminar de favoritos";
		}
	});

	const readBtn = document.createElement("button");
	readBtn.textContent = isRead(id) ? "Marcar como no leído" : "Marcar como leído";
	readBtn.addEventListener("click", () => {
		if (isRead(id)) {
			removeRead(id);
			readBtn.textContent = "Marcar como leído";
		} else {
			saveRead(id);
			readBtn.textContent = "Marcar como no leído";
		}
	});

	const buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add("book-buttons");
	buttonsContainer.append(favBtn, readBtn);

	bookCard.appendChild(buttonsContainer);
	return bookCard;
};


// export const renderBooks = (books) => {
// 	const booksContainer = document.getElementById("books-container");
// 	booksContainer.innerHTML = "";

// 	books.forEach((book) => {
// 		const bookCard = document.createElement("div");
// 		bookCard.classList.add("book-card");

// 		const id = book.key;
// 		const title = book.title || "Titulo no disponible";
// 		const author = book.author_name ? book.author_name.join(", ") : "Autor desconocido";
// 		const year = book.first_publish_year || "Año no disponible";
// 		const coverId = book.cover_i ? book.cover_i : null;
// 		const imageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "imagen-no-disponible.jpg";

// 		bookCard.innerHTML = `
//         <img src="${imageUrl}" alt="Portada de ${title}" class="book-image">
//         <h3>${title}</h3>
//         <p><strong>Autor:</strong> ${author}</p>
//         <p><strong>Año de publicación:</strong> ${year}</p>
//         `;

// 		// -------------- BOTÓN DE FAVORITO --------------
// 		const favBtn = document.createElement("button");
// 		favBtn.textContent = isFavorite(id) ? "Eliminar de favoritos" : "Añadir a favoritos";

// 		favBtn.addEventListener("click", () => {
// 			if (isFavorite(id)) {
// 				removeFavorite(id);
// 				favBtn.textContent = "Añadir a favoritos";
// 			} else {
// 				saveFavorite(id);
// 				favBtn.textContent = "Eliminar de favoritos";
// 			}
// 		});

// 		// -------------- BOTÓN MARCAR COMO LEÍDO --------------
// 		const readBtn = document.createElement("button");
// 		readBtn.textContent = isRead(id) ? "Marcar como no leído" : "Marcar como leído";
// 		readBtn.addEventListener("click", () => {
// 			if (isRead(id)) {
// 				removeRead(id);
// 				readBtn.textContent = "Marcar como leído";
// 			} else {
// 				saveRead(id);
// 				readBtn.textContent = "Marcar como no leído";
// 			}
// 		});

// 		const buttonsContainer = document.createElement("div");
// 		buttonsContainer.classList.add("book-buttons");
// 		buttonsContainer.append(favBtn, readBtn);

// 		bookCard.appendChild(buttonsContainer);
// 		booksContainer.appendChild(bookCard);
// 	});
// };