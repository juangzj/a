// Importamos el modelo
const ExperienciaClientes = require('../models/ExperienciaClientes');

/** Métodos para el CRUD */

// Método para mostrar todas las experiencias de usuario existentes
const getAllExprienciasCliente = async (req, res) => {
  try {
    const experienciasClientes = await ExperienciaClientes.find();
    res.status(200).json(experienciasClientes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para mostrar una experiencia de usuario según el ID
const getExperienciaCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const experienciaCliente = await ExperienciaClientes.findById({ _id: id });
    res.status(200).json(experienciaCliente);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para crear una nueva experiencia de cliente
const createExperienciaCliente = async (req, res) => {
  try {
    await ExperienciaClientes.create(req.body);
    res.status(200).json({
      message: "Experiencia de usuario creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para editar una experiencia de usuario
const editExperienciaCLiente = async (req, res) => {
  try {
    const id = req.params.id;
    await ExperienciaClientes.updateOne({ _id: id }, req.body);
    res.status(200).json({
      message: "Experiencia de usuario editada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Método para eliminar una experiencia de usuario
const deleteExperienciaCliente = async (req, res) => {
  try {
    const id = req.params.id;
    await ExperienciaClientes.deleteOne({ _id: id });
    res.status(200).json({
      message: "Experiencia de usuario eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Exportamos los métodos
module.exports = {
  getAllExprienciasCliente,
  getExperienciaCliente,
  createExperienciaCliente,
  editExperienciaCLiente,
  deleteExperienciaCliente,
};
