const bcrypt = require("bcrypt");
const Usuario = require("../models/user.model");

//crear un nuevo usuario y guardarlo en la base de datos.

const crearUsuario = async (usuariodata) => {
  try {
    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    usuariodata.contraseña = await bcrypt.hash(usuariodata.contraseña, salt);

    const nuevoUsuario = new Usuario(usuariodata);
    return await nuevoUsuario.save();
  } catch (error) {
    console.error(error);

    if (error.name == "ValidationError") {
      const errores = Object.values(error.errors).map((error) => error.message);
      throw {
        tipo: "ValidationError",
        mensaje: "Error de Validacion",
        errores: errores,
      };
    }

    throw {
      tipo: error.name || "ERROR",
      mensaje: error.message || "Ocurrio un error al crear el usuario",
    };
  }
};

//obtener todos los usuarios.

const obtenerUsuarios = async () => {
  try {
    return await Usuario.find();
  } catch (error) {
    console.error(error);
  }
};

//obtener un usuario por su ID.

const obtenerUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return "Usuario mo Encontrado";
    }
    return usuario;
  } catch (error) {
    console.error(error);
  }
};

//Actualizar un usuario existente

const actualizarUsuario = async (id, datos) => {
  try {
    // Filtrar solo campos permitidos
    const camposPermitidos = ['nombre', 'email', 'contraseña'];
    const datosActualizados = {};

    for (const campo of camposPermitidos) {
      if (datos[campo]) {
        datosActualizados[campo] = datos[campo];
      }
    }

    // 🔐 Si hay contraseña nueva, hashearla
    if (datosActualizados.contraseña) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados.contraseña = await bcrypt.hash(datosActualizados.contraseña, salt);
    }

    // 📌 Actualizar en la base de datos
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      throw new Error("Usuario no encontrado");
    }

    return usuarioActualizado;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    throw error;
  }
};


//Eliminar un usuario

const EliminarUsuario = async (id) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return "Usuario no encontrado";
    }

    return { mensaje: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error(error);
  }
};

// Verificar Credenciales

const verificarCredenciales = async (email, contraseña) => {
  try {
    const usuario = await Usuario.findOne({ email }).select("+contraseña");
    if (!usuario) {
      return { exito: false, mensaje: "Credenciales inválidas" };
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return { exito: false, mensaje: "Credenciales inválidas" };
    }

    const usuarioSinContraseña = usuario.toObject();
    delete usuarioSinContraseña.contraseña;

    return { exito: true, usuario: usuarioSinContraseña };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  EliminarUsuario,
  verificarCredenciales,
};
