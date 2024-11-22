const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Esquema para ExperienciaClientes
const experienciaClienteSchema = new Schema(
  {
    cliente_id: { type: String, required: true },
    fecha_visita: { type: Date, required: true },
    evento_asistido: { type: String, required: true },
    valoracion_general: { type: Number, required: true, min: 0, max: 5 },
    aspectos_destacados: { type: [String], default: [] },
    comentarios: { type: String, default: "" },
    elementos_mejorar: { type: [String], default: [] },
    probabilidad_retorno: { type: String, enum: ["Baja", "Media", "Alta", "Muy alta"], required: true },
    recomendaciones_amigos: { type: Boolean, default: false },
  },
  { collection: 'experiencia_clientes' }
);

// Exportar el modelo
module.exports = mongoose.model('ExperienciaCliente', experienciaClienteSchema);
