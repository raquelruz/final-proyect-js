// export const registerUser = (event) => {
//     event.preventDefault();


// const username = document.getElementById("name-register");
// const email = document.getElementById("email-register");
// const password = document.getElementById("password-register");

// if (!username || !email || !password) {
//     alert("Todos los campos son obligatorios");
//     return;
// }

// const user = {
//     username,
//     email,
//     password,
//     favoritos: [],
//     leidos: []
// }

// localStorage.setItem("user", JSON.stringify(user));
// alert("Usuario registrado correctamente")
// }

export const registrarUsuario = (nombre, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(user => user.email === email);
    if (exists) {
        alert("Este email ya está registrado");
        return false;
    }

    const newUser = { nombre, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso");
    return true;
}