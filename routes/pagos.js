const express = require('express');
const router = express.Router();
const { pagar } = require('./../controllers/pagoController');
const { verificarToken, soloPacientes } = require('./../middlewares/authMiddleware');
/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Registrar pago manual de una cita
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cita_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pago registrado correctamente
 */

router.post('/:citaId', verificarToken, soloPacientes, pagar);

module.exports = router;
