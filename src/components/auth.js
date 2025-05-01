// -------------- REGISTRO DE USUARIOS --------------
export const registerUser = (event) => {
	event.preventDefault();

	const usernameInput = document.getElementById("name-register");
	const emailInput = document.getElementById("email-register");
	const passwordInput = document.getElementById("password-register");

	if (!usernameInput || !emailInput || !passwordInput) {
		alert("Todos los campos son obligatorios");
		return;
	}

	const username = usernameInput.value.trim();
	const email = emailInput.value.trim();
	const password = passwordInput.value.trim();

	if (!username || !email || !password) {
		alert("Todos los campos deben estar llenos");
		return;
	}

	const success = registrarUsuario(username, email, password);

	if (success) {
		alert("Usuario registrado correctamente");
	}
};

export const registrarUsuario = (nombre, email, password) => {
	const users = JSON.parse(localStorage.getItem("users")) || [];

	const exist = users.some((user) => user.email === email);

	if (exist) {
		alert("Este email ya está registrado");
		return false;
	}

	const newUser = {
		nombre,
		email,
		password,
		favoritos: [],
		leidos: [],
	};

	users.push(newUser); 
	localStorage.setItem("users", JSON.stringify(users));

	return true;
};

// -------------- LOGIN --------------

