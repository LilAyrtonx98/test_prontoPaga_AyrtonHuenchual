const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
// Rutas para cada uno de los servicios 
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const citasRoutes = require('./routes/citas');
app.use('/citas', citasRoutes);

const pagosRoutes = require('./routes/pagos');
app.use('/pagos', pagosRoutes);

const stripeRoutes = require('./routes/stripe');
app.use('/stripe', stripeRoutes);

app.get('/', (req, res) => {
  res.send('APIRestFul del test de ProntoPaga funcionando correctamente');
});
const { swaggerSpec, swaggerUi } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Solo ejecutar el servidor si no es entorno de test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;
