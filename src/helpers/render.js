import { getBooksByQuery } from "../components/api.js";
import { isFavorite, saveFavorite, removeFavorite, isRead, saveRead, removeRead } from "../utils/storage.js";

export const renderBooks = (books, container = null) => {
	const booksContainer = container || document.getElementById("books-container");
	if (!booksContainer) return;

	booksContainer.innerHTML = "";

	if (books.length === 0) {
		booksContainer.innerHTML = "<p>No se encontraron libros para mostrar</p>";
		return;
	}

	books.forEach((book) => {
		const bookCard = createBookCard(book);
		if (bookCard) booksContainer.appendChild(bookCard);
	});
};

export const renderBooksSection = (books, containerId) => {
	console.log(books);
	console.log(containerId);
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
	const imageUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
		: "./media/images/imagen-no-disponible.jpg";

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

			if (
				window.location.hash === "#favoritos" ||
				document.getElementById("favorites-container").offsetParent !== null
			) {
				favBtn.closest(".book-card")?.remove();
			}
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

			const isReadSection =
				window.location.hash === "#leidos" ||
				document.getElementById("read-section")?.style.display === "block";

			if (isReadSection) {
				readBtn.closest(".book-card")?.remove();
			}
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

export const renderFavoriteBooks = (books) => {
	const favoritesContainer = document.getElementById("favorites-container");
	if (!favoritesContainer) {
		console.error("No se encontró el contenedor de favoritos.");
		return;
	}

	favoritesContainer.innerHTML = "";

	if (books.length === 0) {
		favoritesContainer.innerHTML = "<p>No tienes libros favoritos.</p>";
		return;
	}

	books.forEach((book) => {
		const bookCard = createBookCard(book);
		if (bookCard) {
			favoritesContainer.appendChild(bookCard);
		}
	});
};

export const renderReadBooks = (books) => {
	const readContainer = document.getElementById("read-container");
	if (!readContainer) {
		console.error("No se encontró el contenedor de libros leídos.");
		return;
	}

	readContainer.innerHTML = "";

	if (books.length === 0) {
		readContainer.innerHTML = "<p>No tienes libros leídos.</p>";
		return;
	}

	books.forEach((book) => {
		const bookCard = createBookCard(book);
		if (bookCard) {
			readContainer.appendChild(bookCard);
		}
	});
};

export const renderGenresSection = (genres) => {
	const genresContainer = document.getElementById("genres-container");

	if (!genresContainer) return;

	genresContainer.innerHTML = "";

	if (genres.length === 0) {
		genresContainer.innerHTML = "<p>No se encontraron géneros disponibles.</p>";
		return;
	}

	genres.forEach((genre) => {
		const genreSection = document.createElement("div");
		genreSection.classList.add("genre-section");

		const genreTitle = document.createElement("h3");
		genreTitle.textContent = genre;
		genreTitle.classList.add("category-title");
		genreSection.appendChild(genreTitle);

		const booksByGenre = books.filter((book) => book.subject && book.subject.includes(genre));

		booksByGenre.forEach((book) => {
			const bookCard = createBookCard(book);
			genreSection.appendChild(bookCard);
		});

		genresContainer.appendChild(genreSection);
	});
};
