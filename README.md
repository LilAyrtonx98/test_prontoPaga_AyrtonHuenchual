ProntoPaga API

API RESTful desarrollada con Node.js + Express y base de datos PostgreSQL para gestionar citas médicas, pagos y autenticación con JWT. Incluye integración con Stripe para pagos sandbox.

📄 Tecnologías utilizadas

Node.js v18.20.8

NPM v10.8.2

Express

PostgreSQL

JWT (jsonwebtoken)

Bcrypt

Stripe

Swagger (swagger-jsdoc + swagger-ui-express)

Jest (para pruebas unitarias)

🚀 Instalación

Clona este repositorio:

git clone https://github.com/LilAyrtonx98/test_prontoPaga_AyrtonHuenchual.git
cd prontopaga

Instala las dependencias:

npm install

Configura el archivo .env:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=prontopaga
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=clave_super_secreta

Crea la base de datos:

sudo -u postgres psql -f /ruta/a/createdb.sql
sudo -u postgres psql -d prontopaga -f /ruta/a/poblation.sql

🌐 Ejecutar el servidor

node index.js

La API estará disponible en: http://localhost:3000

Documentación Swagger: http://localhost:3000/api-docs

✅ Ejecutar tests unitarios

npm test

📅 Funcionalidades principales

En postman o Insomnia, o el que utilizen:

Registro e inicio de sesión (JWT)
Ejemplo iniciar sesión:POST http://localhost:3000/auth/login
Body: {
  "email": "camila@paciente.cl",
  "password": "123456"
}

Solicitar cita médica:
Para hacerlo se debe haber iniciado sesión con el paciente y en Auth -> Token, pegar el token correspondiente del usuario iniciado en esta ruta:
POST http://localhost:3000/citas
con el Body: {
  "fecha": "2025-05-14",
  "hora": "10:30",
  "medico_id": 2
}
Pagar cita (manual o vía Stripe Checkout sandbox)
para pagar una cita mediante la pasarela de pago usar esta URL
POST http://localhost:3000/stripe/checkout, con este body
{
  "cita_id": {id}, (o el id de la cita correspondiente)
  "descripcion": "Consulta médica general"
}
Retornara una URL en donde se realiza el pago 

Confirmar o rechazar cita (médico)
(Antes de debe haber inicado sesión como médico y obtener el token)
PUT http://localhost:3000/citas/{id}/confirmar
Ṕara rechar una cita
PUT http://localhost:3000/citas/{id}/rechazar

Ver citas del día (médico)
para listar las citas del médico (Antes se debe hacer iniciado sesión como médico)
GET http://localhost:3000/citas/hoy

Ver agenda del paciente
(Antes se necesita haber iniciado sesión como paciente)
GET http://localhost:3000/citas/mis-citas

Validaciones de horario y duplicidad

📃 Estructura del proyecto

/prontopaga
├── controllers/         # Lógica HTTP
├── services/            # Lógica de negocio
├── models/              # Clases de entidad
├── routes/              # Definición de endpoints
├── middlewares/         # Autenticación y autorización
├── config/              # Conexión a BD y Swagger
├── test/                # Tests con Jest
├── index.js             # Punto de entrada
├── .env
├── README.md

🔐 Seguridad

Autenticación con JWT (token Bearer)

Middleware verificarToken y soloMedicos / soloPacientes

Validaciones de acceso y estado de cita

🌍 Stripe (Sandbox)

Este proyecto usa Stripe en modo sandbox:

Crear sesión de pago: POST /stripe/checkout

Registro de pago exitoso: GET /stripe/exito

Cancelación de pago: GET /stripe/cancelado

Puedes usar las tarjetas de prueba disponibles en:
https://stripe.com/docs/testing

🌟 Contribución

Pull requests bienvenidas. Para sugerencias o errores, puedes abrir issues en el repo.

✉️ Autor

Ayrton Ybraim Huenchual San JuanDesarrollador Full Stack - LinkedIn

📁 Licencia

MIT

