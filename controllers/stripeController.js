const {
    crearSesionCheckout,
    registrarPagoExitoso
  } = require('../services/stripeService');
  //Función que permite iniciar el proceso de pago con el sandbox
  async function crearCheckout(req, res) {
    try {
      const { url } = await crearSesionCheckout(req.body);
      res.json({ url });
    } catch (error) {
      console.error('Error al crear sesión de Stripe:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión de pago' });
    }
  }
  //Función que registra el pago si se realiza o no correctamente
  async function registrarPago(req, res) {
    try {
      await registrarPagoExitoso(req.query.cita_id);
      res.send('✅ Pago registrado correctamente. Puedes cerrar esta ventana.');
    } catch (error) {
      console.error('Error al registrar pago desde Stripe:', error);
      res.status(error.status || 500).send(error.message);
    }
  }
  
  module.exports = {
    crearCheckout,
    registrarPago
  };
  