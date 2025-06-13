import { registerUser } from "./components/auth.js";

document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	const form = document.querySelector(".register-form");

	if (form) {
		form.addEventListener("submit", registerUser);
	} else {
		console.warn("No se encontró el formulario con clase 'register-form'");
	}
});