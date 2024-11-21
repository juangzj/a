// Importamos el modelo de eventos
const EventModel = require('../models/EventModel');

// Obtener todos los eventos
const getAllEvents = (req, res) => {
  EventModel.getAllEvents((err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los eventos', error: err });
    }
    res.status(200).json(events);
  });
};

// Obtener un evento por su ID
const getEventById = (req, res) => {
  const { evento_id } = req.params;
  EventModel.getEventById(evento_id, (err, event) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el evento', error: err });
    }
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(event);
  });
};

// Crear un nuevo evento
const createEvent = (req, res) => {
  const newEvent = req.body;

  // Validación básica
  if (!newEvent.nombre_evento || !newEvent.fecha || !newEvent.hora_inicio || !newEvent.hora_fin || !newEvent.capacidad_maxima || !newEvent.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  EventModel.createEvent(newEvent, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el evento', error: err });
    }
    res.status(201).json({ message: 'Evento creado exitosamente', evento_id: result.insertId });
  });
};

// Actualizar un evento
const updateEvent = (req, res) => {
  const { evento_id } = req.params;
  const updatedEvent = req.body;

  if (!updatedEvent.nombre_evento || !updatedEvent.fecha || !updatedEvent.hora_inicio || !updatedEvent.hora_fin || !updatedEvent.capacidad_maxima || !updatedEvent.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  EventModel.updateEvent(evento_id, updatedEvent, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el evento', error: err });
    }
    res.status(200).json({ message: 'Evento actualizado exitosamente' });
  });
};

// Eliminar un evento
const deleteEvent = (req, res) => {
  const { evento_id } = req.params;
  EventModel.deleteEvent(evento_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el evento', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado exitosamente' });
  });
};

// Buscar eventos por nombre y estado
const searchEvents = (req, res) => {
  const { nombre_evento, estado } = req.query;

  // Validación: al menos uno de los parámetros debe ser proporcionado
  if (!nombre_evento && !estado) {
    return res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda' });
  }

  EventModel.searchEvents(nombre_evento, estado, (err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar los eventos', error: err });
    }
    res.status(200).json(events);
  });
};

// Exportamos los métodos
module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents
};
