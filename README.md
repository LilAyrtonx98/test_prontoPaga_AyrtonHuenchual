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

git clone https://github.com/tu-usuario/prontopaga.git
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

Registro e inicio de sesión (JWT)

Solicitar cita médica

Pagar cita (manual o vía Stripe Checkout sandbox)

Confirmar o rechazar cita (médico)

Ver citas del día (médico)

Ver agenda del paciente

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

