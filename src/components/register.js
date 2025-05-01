import { registerUser } from "./auth.js"; // Importar desde la misma carpeta

document.addEventListener("DOMContentLoaded", () => {
	console.log("JavaScript funcionando y DOM cargado");

	const form = document.getElementById("register-form");
	if (form) {
		form.addEventListener("submit", registerUser);
	} else {
		console.warn("No se encontró el formulario con id 'register-form'");
	}
});