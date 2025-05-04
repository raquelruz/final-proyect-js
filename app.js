import { getDataFromApi } from "./src/components/api.js";

document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	// Comprobación de usuario
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

	// Botón de menú para mostrar el sidebar
	const menuBtn = document.querySelector(".icon-menu");
	const sidebar = document.querySelector(".sidebar");

	if (menuBtn && sidebar) {
		menuBtn.addEventListener("click", () => {
			console.log("Click en el menú");
			sidebar.classList.toggle("active");
		});
	} else {
		console.warn("No se encontró el botón del menú o el sidebar");
	}

	// Búsqueda de libros
	const searchBtn = document.getElementById("search-btn");
	const searchInput = document.getElementById("search-input");

	if (searchBtn && searchInput) {
		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const query = searchInput.value.trim();
			if (query) getDataFromApi(query);
		});
	}
});