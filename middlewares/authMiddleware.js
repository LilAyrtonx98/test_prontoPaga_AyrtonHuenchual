const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
//Función que permite verificar que el token de la persona este correctamente ademas de su rol
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ mensaje: 'Token malformado' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.usuario = payload; // ← ahora tendrás { id, email, rol } disponible
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}
//Funcion que verifica que el rol sea del paciente
function soloPacientes(req, res, next) {
  if (req.usuario.rol !== 'paciente') {
    return res.status(403).json({ mensaje: 'Acceso permitido solo a pacientes' });
  }
  next();
}
//Funcion que verifica que el rol sea del medico
function soloMedicos(req, res, next) {
  if (req.usuario.rol !== 'medico') {
    return res.status(403).json({ mensaje: 'Acceso permitido solo a médicos' });
  }
  next();
}

module.exports = {
  verificarToken,
  soloPacientes,
  soloMedicos
};
