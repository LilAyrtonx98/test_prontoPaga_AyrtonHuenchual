const request = require('supertest');
const app = require('../index');

let tokenPaciente;

beforeAll(async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'camila@paciente.cl',
      password: '123456'
    });
    console.log('📌 TOKEN DE PRUEBA:', res.body.token); // 👈
    tokenPaciente = res.body.token;
  });
  

describe('📅 Citas', () => {
  it('Debe crear una cita válida en horario permitido', async () => {
    const res = await request(app)
      .post('/citas')
      .set('Authorization', `Bearer ${tokenPaciente}`)
      .send({
        fecha: '2025-05-14',
        hora: '11:30',
        medico_id: 2
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.cita.estado).toBe('solicitada');
  });

  it('Debe rechazar una cita fuera del horario permitido', async () => {
    const res = await request(app)
      .post('/citas')
      .set('Authorization', `Bearer ${tokenPaciente}`)
      .send({
        fecha: '2025-05-15',
        hora: '13:00', // horario no válido
        medico_id: 2
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/horario/i);
  });
});
