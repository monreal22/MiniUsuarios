const fs = require("fs");

// leer usuarios
const getUsers = () => {
    return fs.readFileSync("./db.json", "utf-8");
};

// guardar usuarios
const saveUsers = (users) => {
    fs.writeFileSync("./db.json", JSON.stringify(users));
};

module.exports = {
    getUsers,
    saveUsers
};