-- Insertar usuarios (médicos y pacientes)
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Dr. Pedro Gómez', 'pedro@medico.cl', '$2b$10$PFFYTK8rKH/.E2mEZSiEGO/Tv5Wlogq65uPuC4LDIEh9SpJGgL.jy', 'medico'),
('Dra. Laura Ruiz', 'laura@medico.cl', '$2b$10$PFFYTK8rKH/.E2mEZSiEGO/Tv5Wlogq65uPuC4LDIEh9SpJGgL.jy', 'medico'),
('Camila Torres', 'camila@paciente.cl', '$2b$10$RrHFFQU3I8MPzAn42qjwd.XgGMiwcK09k6YktwKsO.7REjI9MYFsy', 'paciente'),
('Javier Morales', 'javier@paciente.cl', '$2b$10$RrHFFQU3I8MPzAn42qjwd.XgGMiwcK09k6YktwKsO.7REjI9MYFsy', 'paciente');

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
