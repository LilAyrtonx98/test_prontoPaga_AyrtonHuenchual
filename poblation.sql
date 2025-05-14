-- Insertar usuarios (médicos y pacientes)
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Dr. Pedro Gómez', 'pedro@medico.cl', 'hashedpassword1', 'medico'),
('Dra. Laura Ruiz', 'laura@medico.cl', 'hashedpassword2', 'medico'),
('Camila Torres', 'camila@paciente.cl', 'hashedpassword3', 'paciente'),
('Javier Morales', 'javier@paciente.cl', 'hashedpassword4', 'paciente');

-- Insertar citas (fecha actual y horarios válidos)
INSERT INTO citas (paciente_id, medico_id, fecha, hora, estado) VALUES
(3, 1, CURRENT_DATE, '09:00', 'solicitada'),
(4, 2, CURRENT_DATE, '11:00', 'pagada'),
(3, 1, CURRENT_DATE, '15:00', 'confirmada');

-- Insertar pagos asociados a la cita pagada y confirmada
-- Recuerda: id de citas es secuencial según inserción anterior
INSERT INTO pagos (cita_id, estado_pago, fecha_pago) VALUES
(2, 'pagado', NOW()),
(3, 'pagado', NOW());
