const express = require('express');
const router = express.Router();
const { crear, confirmar, citasDelDia, rechazar, agendaPaciente } = require('./../controllers/citaController');
const { verificarToken, soloPacientes, soloMedicos } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Solicitar una cita médica
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 example: "2025-05-15"
 *               hora:
 *                 type: string
 *                 example: "10:00"
 *               medico_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *       400:
 *         description: Error en validación o cita ya existente
 */

router.post('/', verificarToken, soloPacientes, crear);
/**
 * @swagger
 * /citas/hoy:
 *   get:
 *     summary: Obtener citas confirmadas del día
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del día
 */

router.get('/hoy', verificarToken, soloMedicos, citasDelDia);
/**
 * @swagger
 * /citas/{id}/confirmar:
 *   put:
 *     summary: Confirmar una cita médica
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita a confirmar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita confirmada correctamente
 *       400:
 *         description: La cita no está pagada o ya confirmada
 */

router.put('/:id/confirmar', verificarToken, soloMedicos, confirmar);
/**
 * @swagger
 * /citas/mis-citas:
 *   get:
 *     summary: Obtener citas que tengo agendada (paciente)
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del día
 */

router.get('/mis-citas', verificarToken, soloPacientes, agendaPaciente);
/**
 * @swagger
 * /citas/{id}/rechazar:
 *   put:
 *     summary: Rechazar una cita médica
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita a rechazar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita rechazada
 *       404:
 *         description: Cita no encontrada
 */

router.put('/:id/rechazar', verificarToken, soloMedicos, rechazar);


module.exports = router;
