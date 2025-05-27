const express = require("express");
const connectDB = require("./config/database");
const usuarioRoutes= require("./routes/user.roustes");
const Usuario = require("./models/user.model");

//inicializamos la aplicacion de express.

const app = express();

//middleware para parsear JSON

app.use(express.json());

//conectarnos a la base de datos.

connectDB();

//ruta de bienvenida

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Usuarios");
});

//Ruta de Usuarios

app.use("/api/usuarios", usuarioRoutes)

//iniciar el servidor.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
