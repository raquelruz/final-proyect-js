console.log("JavaScript Funcionando")

import { getDataFromApi } from "./src/components/api.js"
import { saveBook, getBooks, deleteBooks, updateBook } from "./src/utils/storage.js"
// import { render } from ".src/helpers/render.js"

const searchInput = document.getElementById("books-search");
const searchBtn = document.getElementById("search-btn");
const searchContainer = document.getElementById("form-container");

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    if (query) {
        const books = await getDataFromApi(query);

        renderBooks(books, searchContainer);
    }
})