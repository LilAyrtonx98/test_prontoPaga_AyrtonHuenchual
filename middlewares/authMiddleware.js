const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

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
    req.user = payload; // ← ahora tendrás { id, email, rol } disponible
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}

function soloPacientes(req, res, next) {
  if (req.user.rol !== 'paciente') {
    return res.status(403).json({ mensaje: 'Acceso permitido solo a pacientes' });
  }
  next();
}

function soloMedicos(req, res, next) {
  if (req.user.rol !== 'medico') {
    return res.status(403).json({ mensaje: 'Acceso permitido solo a médicos' });
  }
  next();
}

module.exports = {
  verificarToken,
  soloPacientes,
  soloMedicos
};
