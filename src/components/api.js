export const getDataFromApi = async (query) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&language=spa`);

        if (!response.ok) {
            throw new Error("Error al obtener datos");
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);

        const container = document.getElementById("container");

        data.docs.slice(0, 10).forEach(book => {
            const title = book.title || "Título no disponible";
            const author = book.author_name ? book.author_name.join(", ") : "Autor desconocido";
            const year = book.first_publish_year || "Año no disponible";
            const coverId = book.cover_i ? book.cover_i : null;
            const imageUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : "imagen-no-disponible.jpg"; // Imagen de portada

            const card = document.createElement('div');
            card.classList.add('book-card');

            card.innerHTML = `
                <img src="${imageUrl}" alt="Portada de ${title}" class="book-image">
                <h3>${title}</h3>
                <p><strong>Autor:</strong> ${author}</p>
                <p><strong>Año de publicación:</strong> ${year}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Hubo un error:", error.message);
    }
};

getDataFromApi();