-- Crear base de datos
-- CREATE DATABASE prontopaga; 

-- Seleccionar base de datos (esto lo haces fuera del script si estás en psql)
-- \c prontopaga;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('paciente', 'medico'))
);

-- Tabla de citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL REFERENCES usuarios(id),
    medico_id INT NOT NULL REFERENCES usuarios(id),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'solicitada' CHECK (estado IN ('solicitada', 'pagada', 'confirmada')),
    UNIQUE (medico_id, fecha, hora) -- para evitar doble reserva en ese horario
);

-- Tabla de pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    cita_id INT NOT NULL REFERENCES citas(id) ON DELETE CASCADE,
    estado_pago VARCHAR(20) NOT NULL CHECK (estado_pago IN ('pendiente', 'pagado')),
    fecha_pago TIMESTAMP DEFAULT NOW()
);
