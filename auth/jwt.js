const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generarToken(usuario) {
  return jwt.sign({
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol
  }, SECRET, { expiresIn: '2h' });
}

function verificarToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generarToken, verificarToken };
