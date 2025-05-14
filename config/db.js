const { Pool } = require('pg');
require('dotenv').config();
//Se toman las variables de entorno para la conexión con la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Se verifica la conexión
pool.connect()
  .then(() => console.log('🟢 Conectado a PostgreSQL exitosamente'))
  .catch(err => console.error('🔴 Error al conectar a PostgreSQL:', err));

module.exports = pool;
