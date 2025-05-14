const express = require('express');
const router = express.Router();
const { crearCheckout, registrarPago } = require('../controllers/stripeController');
const { verificarToken, soloPacientes } = require('../middlewares/authMiddleware');

router.post('/checkout', verificarToken, soloPacientes, crearCheckout);
router.get('/exito', registrarPago);
router.get('/cancelado', (req, res) => {
    res.send('❌ El pago fue cancelado.');
  });
  
module.exports = router;
