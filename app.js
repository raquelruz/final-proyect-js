import { getDataFromApi } from "./src/components/api.js";

// import { render } from ".src/helpers/render.js"

// USUARIO -> INICIO DE SESIÓN / CERRAR SESIÓN
document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	if (currentUser) {
		const header = document.createElement("div");
		header.classList.add("logout-container");

		header.innerHTML = `
			<button id="logout-btn">Cerrar sesión</button>
		`;
		document.body.prepend(header);

		document.getElementById("logout-btn").addEventListener("click", () => {
			localStorage.removeItem("currentUser");
			window.location.href = "login.html";
		});
	} else {
		window.location.href = "login.html";
		return;
	}
});

// LIBROS
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const query = searchInput.value.trim();
	if (query) getDataFromApi(query);
});