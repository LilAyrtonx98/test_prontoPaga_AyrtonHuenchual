const db = require('../config/db');
//Función que valida que la hora de la cita sea en los rangos validos
function esHorarioValido(hora) {
  const [h] = hora.split(':').map(Number);
  return (h >= 7 && h < 12) || (h >= 14 && h < 18);
}
//Función que valida todos los requisitos para crear una cita
async function crearCita(data, usuario) {
  const { fecha, hora, medico_id } = data;
  //Solo pueden ser pacientes
  if (usuario.rol !== 'paciente') {
    throw { status: 403, message: 'Solo pacientes pueden pedir citas' };
  }
  //Solo puede ser en horarios validos
  if (!esHorarioValido(hora)) {
    throw { status: 400, message: 'Horario no permitido' };
  }

  const existente = await db.query(
    'SELECT * FROM citas WHERE medico_id = $1 AND fecha = $2 AND hora = $3',
    [medico_id, fecha, hora]
  );

  if (existente.rows.length > 0) {
    throw { status: 400, message: 'Ya existe una cita en ese horario' };
  }

  const result = await db.query(
    'INSERT INTO citas (paciente_id, medico_id, fecha, hora) VALUES ($1, $2, $3, $4) RETURNING *',
    [usuario.id, medico_id, fecha, hora]
  );

  return result.rows[0];
}
//Funcion que permite validar para poder confirmar una cita, en base a su estado
async function confirmarCita(id, usuario) {
  if (usuario.rol !== 'medico') {
    throw { status: 403, message: 'Solo médicos pueden confirmar citas' };
  }

  const result = await db.query('SELECT * FROM citas WHERE id = $1', [id]);
  const cita = result.rows[0];

  if (!cita) {
    throw { status: 404, message: 'Cita no encontrada' };
  }

  if (cita.estado !== 'pagada') {
    throw { status: 400, message: 'La cita debe estar pagada para confirmarse' };
  }

  await db.query('UPDATE citas SET estado = $1 WHERE id = $2', ['confirmada', id]);
}
//Funcion que obtiene todas las citas del día del médico
async function listarCitasDelDia(usuario) {
  if (usuario.rol !== 'medico') {
    throw { status: 403, message: 'Solo médicos pueden ver sus citas' };
  }

  const hoy = new Date().toISOString().split('T')[0];
  const result = await db.query(
    'SELECT * FROM citas WHERE medico_id = $1 AND fecha = $2 AND estado = $3',
    [usuario.id, hoy, 'confirmada']
  );

  return result.rows;
}
//Función que permite que un médico rechaze una cita y haciendo todas las validaciones
//correspondientes
async function rechazarCita(id, usuario) {
    if (usuario.rol !== 'medico') {
      throw { status: 403, message: 'Solo médicos pueden rechazar citas' };
    }
  
    const result = await db.query('SELECT * FROM citas WHERE id = $1', [id]);
    const cita = result.rows[0];
  
    if (!cita) {
      throw { status: 404, message: 'Cita no encontrada' };
    }
  
    if (cita.estado === 'confirmada') {
      throw { status: 400, message: 'No puedes rechazar una cita ya confirmada' };
    }
  
    await db.query('UPDATE citas SET estado = $1 WHERE id = $2', ['rechazada', id]);
  }
  async function obtenerAgenda(usuario) {
    if (usuario.rol !== 'paciente') {
      throw { status: 403, message: 'Solo pacientes pueden ver su agenda' };
    }
  
    const result = await db.query(
      'SELECT * FROM citas WHERE paciente_id = $1 ORDER BY fecha ASC, hora ASC',
      [usuario.id]
    );
  
    return result.rows;
  }
    

module.exports = { crearCita, confirmarCita, listarCitasDelDia, rechazarCita, obtenerAgenda };
