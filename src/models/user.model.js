const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false,
  },

  edad: {
    type: Number,
    min: 0,
    validate: {
      validator: function (e) {
        return e >= 0;
      },
      message: (props) =>
        `${props.value} no es una edad valida debe ser un numero positivo.`,
    },
  },
  activo: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
