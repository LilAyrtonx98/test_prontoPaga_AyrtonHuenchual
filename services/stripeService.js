const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');
//Fucnion que da el inicio de la conexión con el sandbox para el inicio del pago
async function crearSesionCheckout({ cita_id, descripcion }) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'clp',
          product_data: {
            name: descripcion || 'Pago de cita médica'
          },
          unit_amount: 10000 * 100 // $10.000 CLP
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/stripe/exito?cita_id=${cita_id}`,
    cancel_url: `http://localhost:3000/stripe/cancelado`
  });

  return { url: session.url };
}
//Funcion que permite cambiar el estado de la cita, si su pago fue exitoso
async function registrarPagoExitoso(cita_id) {
  const cita = await db.query('SELECT * FROM citas WHERE id = $1', [cita_id]);

  if (cita.rows.length === 0) {
    throw { status: 404, message: 'Cita no encontrada' };
  }

  if (cita.rows[0].estado !== 'solicitada') {
    throw { status: 400, message: 'La cita ya fue pagada o confirmada' };
  }

  await db.query('INSERT INTO pagos (cita_id, estado_pago) VALUES ($1, $2)', [cita_id, 'pagado']);
  await db.query('UPDATE citas SET estado = $1 WHERE id = $2', ['pagada', cita_id]);
}

module.exports = {
  crearSesionCheckout,
  registrarPagoExitoso
};
