const { registrarPago } = require('../services/pagoServices');

async function pagar(req, res) {
  try {
    const pago = await registrarPago(req.body, req.usuario);
    res.json({ mensaje: 'Pago registrado correctamente', pago });
  } catch (error) {
    res.status(error.status || 400).json({ mensaje: error.message });
  }
}

module.exports = { pagar };
