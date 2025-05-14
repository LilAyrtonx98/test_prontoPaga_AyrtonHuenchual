const {
    crearCita,
    confirmarCita,
    listarCitasDelDia,
    obtenerAgenda
  } = require('../services/citaService');
  //Función que crea una nueva cita 
  async function crear(req, res) {
    try {
      const cita = await crearCita(req.body, req.usuario);
      res.status(201).json({ mensaje: 'Cita creada', cita });
    } catch (error) {
      res.status(error.status || 400).json({ mensaje: error.message });
    }
  }
  //Función que confirma una cita pagada
  async function confirmar(req, res) {
    try {
      await confirmarCita(req.params.id, req.usuario);
      res.json({ mensaje: '✅ Cita confirmada exitosamente' });
    } catch (error) {
      res.status(error.status || 400).json({ mensaje: error.message });
    }
  }
  //Función que retorma las citas del dia del médico
  async function citasDelDia(req, res) {
    try {
      const citas = await listarCitasDelDia(req.usuario);
      res.json({ citas });
    } catch (error) {
      res.status(error.status || 400).json({ mensaje: error.message });
    }
  }
  //Función que permite rechazar una cita
  async function rechazar(req, res) {
    try {
      await rechazarCita(req.params.id, req.usuario);
      res.json({ mensaje: '🚫 Cita rechazada correctamente' });
    } catch (error) {
      res.status(error.status || 400).json({ mensaje: error.message });
    }
  }
  //Funciń que muestra la lista de citas del paciente
  async function agendaPaciente(req, res) {
    try {
      const citas = await obtenerAgenda(req.usuario);
      res.json({ citas });
    } catch (error) {
      res.status(error.status || 400).json({ mensaje: error.message });
    }
  }
  
  
  //Se exportan
  module.exports = { crear, confirmar, citasDelDia, rechazar, agendaPaciente };
  