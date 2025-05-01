import { loginUser } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Login JS Cargado");

    const form = document.getElementById("login-form");
    
    if (form) {
        form.addEventListener("submit", loginUser);
    } else {
        console.warn("No se encontró el formulario con id 'login-form'")
    }
});