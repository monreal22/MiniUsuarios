// REGISTRO: función para registrar un nuevo usuario
function register() {
    // Obtener los valores de los inputs del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Enviar los datos al servidor usando fetch
    fetch("http://localhost:3000/users", {
        method: "POST", // método POST para crear un nuevo usuario
        headers: { "Content-Type": "application/json" }, // enviar JSON
        body: JSON.stringify({ nombre, email, password }) // datos del usuario
    })
    .then(res => res.json()) // convertir la respuesta a JSON
    .then(data => {
        alert(data.message); // mostrar mensaje del servidor
        window.location.href = "login.html"; // redirigir a login
    });
}

// LOGIN: función para iniciar sesión
function login() {
    alert("Entrando a login"); // mensaje de prueba

    // Obtener valores del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificar usuario en el servidor
    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) // enviar credenciales
    })
    .then(res => res.json())
    .then(data => {
        if (data.user) {
            // Si hay usuario, guardar en localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "home.html"; // ir a home
        } else {
            alert(data.message); // mostrar error
        }
    })
    .catch(err => alert("ERROR: " + err)); // capturar errores de fetch
}

// HOME: mostrar usuario logueado si hay uno
if (document.getElementById("usuario")) {
    const user = JSON.parse(localStorage.getItem("user")); // obtener usuario del storage

    if (!user) window.location.href = "login.html"; // si no hay usuario, ir a login
    else document.getElementById("usuario").innerText = "Hola " + user.nombre; 
    // mostrar saludo
}

// LOGOUT: cerrar sesión
function logout() {
    localStorage.removeItem("user"); // borrar usuario del storage
    window.location.href = "login.html"; // volver a login
}