const request = require('supertest');
const app = require('../index');
const db = require('../config/db');
let tokenMedico;
let tokenPaciente;
let citaIdConfirmable;

beforeAll(async () => {
  // Login como médico
  const resMedico = await request(app).post('/auth/login').send({
    email: 'laura@medico.cl',
    password: '1234567'
  });
  tokenMedico = resMedico.body.token;

  // Login como paciente (el que crea la cita)
  const resPaciente = await request(app).post('/auth/login').send({
    email: 'camila@paciente.cl',
    password: '123456'
  });
  tokenPaciente = resPaciente.body.token;

  // Crear cita como paciente
  const resCita = await request(app)
    .post('/citas')
    .set('Authorization', `Bearer ${tokenPaciente}`)
    .send({
      fecha: new Date().toISOString().split('T')[0],
      hora: '10:30',
      medico_id: 2
    });

  console.log('🧪 CREACIÓN CITA:', resCita.body);

  citaIdConfirmable = resCita.body?.cita?.id;

  if (!citaIdConfirmable) throw new Error('No se pudo crear la cita');

  // Marcar como pagada
  await db.query('UPDATE citas SET estado = $1 WHERE id = $2', ['pagada', citaIdConfirmable]);
});


describe('✅ Confirmar cita (como médico)', () => {
  it('Debe confirmar una cita pagada correctamente', async () => {
    const res = await request(app)
      .put(`/citas/${citaIdConfirmable}/confirmar`)
      .set('Authorization', `Bearer ${tokenMedico}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/confirmada/i);
  });
});
describe('📅 Citas del día (médico)', () => {
    it('Debe devolver las citas confirmadas de hoy', async () => {
      const res = await request(app)
        .get('/citas/hoy')
        .set('Authorization', `Bearer ${tokenMedico}`);
  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.citas)).toBe(true);
  
      // Verifica que todas las citas sean para hoy y estén confirmadas
      const hoy = new Date().toISOString().split('T')[0];
  
      for (let cita of res.body.citas) {
        expect(cita.estado).toBe('confirmada');
        expect(cita.fecha.startsWith(hoy)).toBe(true);
      }
    });
  });
  