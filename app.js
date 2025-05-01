console.log("JavaScript Funcionando")

import { getDataFromApi } from "./src/components/api.js"
import { saveBook, getBooks, deleteBooks, updateBook } from "./src/utils/storage.js"
import { registrarUsuario } from "./src/components/auth.js";
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

// const form = document.getElementById("register-form");
// form.addEventListener("submit", registerUser);

// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("name-register").value.trim();
            const email = document.getElementById("email-register").value.trim();
            const password = document.getElementById("password-register").value;

            registrarUsuario(nombre, email, password);
        })
    }
})