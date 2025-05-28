const express = require("express");
const { crearUsuario, eliminarUsuario } = require("../controllers/user.controller");
const {
  obtenerUsuarioPorId,
  obtenerUsuarios,
  actualizarUsuario,
} = require("../services/user.service");
const router = express.Router();

//Ruta para crear un nuevo usuario.

router.post("/crear", crearUsuario);

// Ruta para traer  TODOS los usuarios

router.get("/", obtenerUsuarios);

// Ruta para traer un usuario en especifico 

router.get("/:id", obtenerUsuarioPorId);

//Ruta para Actualizar un usuario 

router.put("/:id", actualizarUsuario)

// Ruta para eliminar un usuario 

router.put("/:id", eliminarUsuario)

module.exports = router;
