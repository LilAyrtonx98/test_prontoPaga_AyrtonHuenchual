const request = require('supertest');
const app = require('../index');
//Test de autentificación correcta de un usuario
describe('🔐 Autenticación', () => {
  it('Debe iniciar sesión correctamente con credenciales válidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'camila@paciente.cl',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.usuario.email).toBe('camila@paciente.cl');
  });

  it('Debe fallar si las credenciales son incorrectas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'camila@paciente.cl',
        password: 'contramal'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.mensaje).toBe('Contraseña incorrecta');
  });
});
