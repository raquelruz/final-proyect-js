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
export const loginUser = (event) => {
	event.preventDefault();

	const emailInput = document.getElementById("email-login");
	const passwordInput = document.getElementById("password-login");

	if (!emailInput || !passwordInput) {
		alert("Todos los campos son obligatorios");
		return;
	}

	const email = emailInput.value.trim();
	const password = passwordInput.value.trim();

	if (!email || !password) {
		alert("Por favor, completa todos los campos");
		return;
	}

	const users = JSON.parse(localStorage.getItem("users")) || [];

	const userFound = users.find(
		(user) => user.email === email && user.password === password
	);

	if (userFound) {
		alert("Inicio de sesión exitoso");
		localStorage.setItem("currentUser", JSON.stringify(userFound));

		window.location.href = "index.html";
	} else {
		alert("Email o contraseña incorrectos");
	}
};
