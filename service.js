const repository = require("./repository");

// obtener usuarios
const getUsersService = () => {
    return repository.getUsers();
};

// REGISTRO
const registerService = (nombre, email, password) => {
    const data = repository.getUsers();
    const users = JSON.parse(data);

    // VALIDACIÓN: campos obligatorios
    if (!nombre || !email || !password) {
        return { error: "Todos los campos son obligatorios" };
    }

    // VALIDACIÓN: email único
    const exists = users.find(u => u.email === email);
    if (exists) {
        return { error: "El email ya existe" };
    }
    if (!email.includes("@")) {
    return { error: "Email inválido" };
}

    users.push({
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        nombre,
        email,
        password
    });

    repository.saveUsers(users);

    return { message: "Usuario registrado" };
};

// LOGIN
const loginService = (email, password) => {
    const data = repository.getUsers();
    const users = JSON.parse(data);

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { error: "Credenciales incorrectas" };
    }

    return { message: "Login exitoso", user };
};

module.exports = {
    getUsersService,
    registerService,
    loginService
};