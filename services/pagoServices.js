const db = require('../config/db');

async function registrarPago(data, usuario) {
  const { cita_id } = data;

  if (usuario.rol !== 'paciente') {
    throw { status: 403, message: 'Solo pacientes pueden pagar citas' };
  }

  const result = await db.query('SELECT * FROM citas WHERE id = $1', [cita_id]);
  const cita = result.rows[0];

  if (!cita) {
    throw { status: 404, message: 'Cita no encontrada' };
  }

  if (cita.estado !== 'solicitada') {
    throw { status: 400, message: 'La cita ya fue pagada o confirmada' };
  }

  await db.query(
    'INSERT INTO pagos (cita_id, estado_pago) VALUES ($1, $2)',
    [cita_id, 'pagado']
  );

  await db.query(
    'UPDATE citas SET estado = $1 WHERE id = $2',
    ['pagada', cita_id]
  );

  return { cita_id, estado_pago: 'pagado' };
}

module.exports = { registrarPago };
