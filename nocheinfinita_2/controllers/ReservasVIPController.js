const ReservasVIPModel = require('../models/ReservasVIPModel');

// Obtener todas las reservas VIP
const getAllReservasVIP = (req, res) => {
  ReservasVIPModel.getAllReservasVIP((err, reservas) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las reservas VIP', error: err });
    }
    res.status(200).json(reservas);
  });
};

// Obtener una reserva VIP por ID
const getReservaVIPById = (req, res) => {
  const { reserva_id } = req.params;
  ReservasVIPModel.getReservaVIPById(reserva_id, (err, reserva) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener la reserva VIP', error: err });
    }
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva VIP no encontrada' });
    }
    res.status(200).json(reserva);
  });
};

// Crear una nueva reserva VIP
const createReservaVIP = (req, res) => {
  const newReserva = req.body;

  // Validación básica
  if (!newReserva.mesa_id || !newReserva.cliente_nombre || !newReserva.evento_id || !newReserva.costo_reserva || !newReserva.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  ReservasVIPModel.createReservaVIP(newReserva, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear la reserva VIP', error: err });
    }
    res.status(201).json({ message: 'Reserva VIP creada exitosamente', reserva_id: result.insertId });
  });
};

// Actualizar una reserva VIP
const updateReservaVIP = (req, res) => {
  const { reserva_id } = req.params;
  const updatedReserva = req.body;

  // Validación básica
  if (!updatedReserva.mesa_id || !updatedReserva.cliente_nombre || !updatedReserva.evento_id || !updatedReserva.costo_reserva || !updatedReserva.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  ReservasVIPModel.updateReservaVIP(reserva_id, updatedReserva, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar la reserva VIP', error: err });
    }
    res.status(200).json({ message: 'Reserva VIP actualizada exitosamente' });
  });
};

// Eliminar una reserva VIP
const deleteReservaVIP = (req, res) => {
  const { reserva_id } = req.params;
  ReservasVIPModel.deleteReservaVIP(reserva_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar la reserva VIP', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reserva VIP no encontrada' });
    }
    res.status(200).json({ message: 'Reserva VIP eliminada exitosamente' });
  });
};

// Buscar reservas VIP por cliente o estado
const searchReservasVIP = async (req, res) => {
  const { cliente_nombre, estado } = req.query;

  try {
    const reservas = await ReservasVIPModel.searchReservasVIP(cliente_nombre, estado);
    res.json(reservas); // Devuelve un array con los resultados
  } catch (err) {
    console.error("Error al buscar las reservas VIP:", err);
    res.status(500).json({ message: "Error interno del servidor", error: err });
  }
};


module.exports = {
  getAllReservasVIP,
  getReservaVIPById,
  createReservaVIP,
  updateReservaVIP,
  deleteReservaVIP,
  searchReservasVIP
};
