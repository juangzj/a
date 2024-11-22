// Importamos el modelo de eventos
const EventModel = require('../models/EventModel');

// Obtener todos los eventos
const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error al obtener los eventos:', err);
    res.status(500).json({ message: 'Error al obtener los eventos', error: err });
  }
};

// Obtener un evento por su ID
const getEventById = async (req, res) => {
  const { evento_id } = req.params;
  try {
    const event = await EventModel.getEventById(evento_id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error('Error al obtener el evento:', err);
    res.status(500).json({ message: 'Error al obtener el evento', error: err });
  }
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
  const newEvent = req.body;

  // Validar los campos obligatorios
  if (!newEvent.nombre_evento || !newEvent.fecha || !newEvent.hora_inicio || !newEvent.hora_fin || !newEvent.capacidad_maxima || !newEvent.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const result = await EventModel.createEvent(newEvent);
    res.status(201).json({ message: 'Evento creado exitosamente', evento_id: result.insertId });
  } catch (err) {
    console.error('Error al crear el evento:', err);
    res.status(500).json({ message: 'Error al crear el evento', error: err });
  }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
  const { evento_id } = req.params;
  const updatedEvent = req.body;

  // Validar los campos obligatorios
  if (!updatedEvent.nombre_evento || !updatedEvent.fecha || !updatedEvent.hora_inicio || !updatedEvent.hora_fin || !updatedEvent.capacidad_maxima || !updatedEvent.estado) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    await EventModel.updateEvent(evento_id, updatedEvent);
    res.status(200).json({ message: 'Evento actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el evento:', err);
    res.status(500).json({ message: 'Error al actualizar el evento', error: err });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  const { evento_id } = req.params;
  try {
    const result = await EventModel.deleteEvent(evento_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json({ message: 'Evento eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el evento:', err);
    res.status(500).json({ message: 'Error al eliminar el evento', error: err });
  }
};

const searchEvents = async (req, res) => {
  const { nombre_evento, estado } = req.query;

  // Log para ver los parámetros recibidos
  console.log('Parámetros recibidos:', { nombre_evento, estado });

  if (!nombre_evento && !estado) {
    return res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda' });
  }

  try {
    const events = await EventModel.searchEvents(nombre_evento, estado);
    if (events.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(events);
  } catch (err) {
    console.error('Error al buscar los eventos:', err);
    res.status(500).json({ message: 'Error al buscar los eventos', error: err });
  }
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
