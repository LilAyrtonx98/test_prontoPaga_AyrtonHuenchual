const db = require('../config/db');
const bcrypt = require('bcrypt');
const { generarToken } = require('../auth/jwt');
const Usuario = require('../models/usuario');
//Función que obtiene el usuario de la plataforma para ver si existe o no y si
//sus contraseñas son correctas o no
async function loginUsuario({ email, password }) {
  const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    throw { status: 401, message: 'Usuario no encontrado' };
  }

  const userDB = result.rows[0];
  const esValida = await bcrypt.compare(password, userDB.password);
  if (!esValida) {
    throw { status: 401, message: 'Contraseña incorrecta' };
  }

  const usuario = new Usuario(userDB);
  const token = generarToken(usuario);
  //Retorna el usuario con sus respectivos datos
  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
}

module.exports = { loginUsuario };
