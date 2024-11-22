// Importamos el modelo de SistemaIluminacion
const SistemaIluminacion = require('../models/SistemaIluminacion');

/** Métodos para el CRUD */

// Método para mostrar todos los sistemas de iluminación existentes
const getAllSistemasIluminacion = async (req, res) => {
  try {
    const sistemasIluminacion = await SistemaIluminacion.find();
    res.status(200).json(sistemasIluminacion);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para mostrar un sistema de iluminación según el ID
const getSistemaIluminacion = async (req, res) => {
  try {
    const id = req.params.id;
    const sistemaIluminacion = await SistemaIluminacion.findById(id);
    if (sistemaIluminacion) {
      res.status(200).json(sistemaIluminacion);
    } else {
      res.status(404).json({ message: "Sistema de iluminación no encontrado" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para crear un nuevo sistema de iluminación
const createSistemaIluminacion = async (req, res) => {
  try {
    const nuevoSistema = new SistemaIluminacion(req.body);
    await nuevoSistema.save(); // Guardamos el nuevo sistema
    res.status(201).json({
      message: "Sistema de iluminación creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para editar un sistema de iluminación
const editSistemaIluminacion = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSistema = await SistemaIluminacion.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedSistema) {
      res.status(200).json({
        message: "Sistema de iluminación editado correctamente",
        sistema: updatedSistema,
      });
    } else {
      res.status(404).json({ message: "Sistema de iluminación no encontrado" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para eliminar un sistema de iluminación
const deleteSistemaIluminacion = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSistema = await SistemaIluminacion.findByIdAndDelete(id);
    if (deletedSistema) {
      res.status(200).json({
        message: "Sistema de iluminación eliminado correctamente",
      });
    } else {
      res.status(404).json({ message: "Sistema de iluminación no encontrado" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Exportamos los métodos como un objeto
module.exports = {
  getAllSistemasIluminacion,
  getSistemaIluminacion,
  createSistemaIluminacion,
  editSistemaIluminacion,
  deleteSistemaIluminacion,
};
