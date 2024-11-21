// Importamos el modelo de DJs
const DjModel = require('../models/DjModel');

// Obtener todos los DJs
const getAllDJs = (req, res) => {
  DjModel.getAllDJs((err, djs) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los DJs', error: err });
    }
    res.status(200).json(djs);
  });
};

// Obtener un DJ por su ID
const getDjById = (req, res) => {
  const { dj_id } = req.params;
  DjModel.getDjById(dj_id, (err, dj) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el DJ', error: err });
    }
    if (!dj) {
      return res.status(404).json({ message: 'DJ no encontrado' });
    }
    res.status(200).json(dj);
  });
};

// Crear un nuevo DJ
const createDj = (req, res) => {
  const newDj = req.body;

  // Validación básica
  if (!newDj.nombre_dj || !newDj.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  DjModel.createDj(newDj, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el DJ', error: err });
    }
    res.status(201).json({ message: 'DJ creado exitosamente', dj_id: result.insertId });
  });
};

// Actualizar un DJ
const updateDj = (req, res) => {
  const { dj_id } = req.params;
  const updatedDj = req.body;

  // Validación básica
  if (!updatedDj.nombre_dj || !updatedDj.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  DjModel.updateDj(dj_id, updatedDj, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el DJ', error: err });
    }
    res.status(200).json({ message: 'DJ actualizado exitosamente' });
  });
};

// Eliminar un DJ
const deleteDj = (req, res) => {
  const { dj_id } = req.params;
  DjModel.deleteDj(dj_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el DJ', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'DJ no encontrado' });
    }
    res.status(200).json({ message: 'DJ eliminado exitosamente' });
  });
};

// Buscar DJs por nombre y estado
const searchDJs = (req, res) => {
  const { nombre_dj, estado } = req.query;

  if (!nombre_dj && !estado) {
    return res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda' });
  }

  DjModel.searchDJs(nombre_dj, estado, (err, djs) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar los DJs', error: err });
    }
    res.status(200).json(djs);
  });
};

// Exportamos los métodos
module.exports = {
  getAllDJs,
  getDjById,
  createDj,
  updateDj,
  deleteDj,
  searchDJs
};
