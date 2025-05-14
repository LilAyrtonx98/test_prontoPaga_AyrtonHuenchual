class Cita {
    constructor({ id, paciente_id, medico_id, fecha, hora, estado }) {
      this.id = id;
      this.paciente_id = paciente_id;
      this.medico_id = medico_id;
      this.fecha = fecha;
      this.hora = hora;
      this.estado = estado;
    }
  }
  
  module.exports = Cita;
  