const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Esquema para sistemaIluminacion
const sistemaIluminacionSchema = new Schema(
  {
    tipo: { type: String, required: true },
    intensidad: { type: Number, required: true },
    ubicacion: { type: String, required: true },
    estado: { type: String, enum: ["Encendido", "Apagado"], required: true },
    fecha_instalacion: { type: Date, required: true },
  },
  { collection: 'sistema_iluminacion' }
);

// Exportamos el modelo con el nombre 'SistemaIluminacion'
module.exports = mongoose.model('SistemaIluminacion', sistemaIluminacionSchema);
