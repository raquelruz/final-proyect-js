import { renderBooks } from '../helpers/render.js';

export const getDataFromApi = async (query) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&language=spa`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();
        console.log("Datos obtenidos:", data);
        renderBooks(data.docs.slice(0, 10)); // Solo pasamos los libros

    } catch (error) {
        console.error("Hubo un error:", error.message);
    }
};

getDataFromApi();