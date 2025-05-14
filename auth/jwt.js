const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
//Función para generar el token del usuario, en donde se tenga como claims, su id, email y rol
function generarToken(usuario) {
  return jwt.sign({
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol
  }, SECRET, { expiresIn: '2h' });
}
//Función para verificar el token
function verificarToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generarToken, verificarToken };
