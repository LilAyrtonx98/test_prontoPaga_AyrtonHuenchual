//Clase que permite crear un objeto Pago
class Pago {
  constructor({ id, cita_id, estado_pago, fecha_pago }) {
    this.id = id;
    this.cita_id = cita_id;
    this.estado_pago = estado_pago;
    this.fecha_pago = fecha_pago;
  }
}

module.exports = Pago;

