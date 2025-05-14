const { loginUsuario } = require('../services/authServices');
//Función del controlador del login en donde se utiliza el servicio para el ingreso de usuario
//de la plataforma
async function login(req, res) {
  try {
    const response = await loginUsuario(req.body);
    res.json(response);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(error.status || 500).json({ mensaje: error.message });
  }
}

module.exports = { login };
