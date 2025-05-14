const bcrypt = require('bcrypt');

async function generarHash(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  console.log('🔐 Contraseña hasheada:', hash);
}

generarHash('1234567');
