const Usuario = require("../models/user.model");

//crear un nuevo usuario y guardarlo en la base de datos.

const crearUsuario = async (usuariodata) => {
  try {
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

    throw{
        tipo: error.name || "ERROR",
        mensaje: error.message || "Ocurrio un error al crear el usuario"
    }
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

const actualizarUsuario = async (id, datosActualizados) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return "Usuario no encontrado";
    }
    return usuarioActualizado;
  } catch (error) {
    console.log("Estas en un Error" + error);
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

const verificarCredenciales = async(email, constraseña) =>{
    try{
        const usuario = await Usuario.findOne({email}).select("+contraseña")
        if(!usuario){
            return {exito:false, mensaje: "Credenciales invalidas"}
        }

        if (usuario.constraseña !== constraseña){
            return {exito:false, mensaje: "Credenciales invalidas"}
        }

        const usuarioSinContraseña= usuario.toObject()
        delete usuarioSinContraseña.constraseña

        return{exito: true, usuario: usuarioSinContraseña };
    } catch (error){
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
