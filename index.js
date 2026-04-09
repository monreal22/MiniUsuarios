const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// CORS (para conectar frontend)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//  Leer usuarios
function getUsers() {
    const data = fs.readFileSync("db.json");
    return JSON.parse(data);
}

//  Guardar usuarios
function saveUsers(users) {
    fs.writeFileSync("db.json", JSON.stringify(users, null, 2));
}

//  Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// Obtener usuarios
app.get("/users", (req, res) => {
    const users = getUsers();
    res.json({ data: users });
});

//  REGISTER
app.post("/users", (req, res) => {
    const { nombre, email, password } = req.body;

    const users = getUsers();

    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = {
        id: users.length + 1,
        nombre,
        email,
        password
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ message: "Usuario registrado correctamente" });
});

//  LOGIN
app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({ user });
});

//  ACTUALIZAR
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    let users = getUsers();

    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    user.password = password || user.password;

    saveUsers(users);

    res.json({ message: "Usuario actualizado" });
});

//  ELIMINAR
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    let users = getUsers();

    users = users.filter(u => u.id !== parseInt(id));

    saveUsers(users);

    res.json({ message: "Usuario eliminado" });
});

//  SERVIDOR
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});