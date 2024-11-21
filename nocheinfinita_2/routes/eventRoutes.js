const express = require('express');
const EventController = require('../controllers/EventController');

const router = express.Router();

// Obtener todos los eventos
router.get('/eventos', EventController.getAllEvents);

// Obtener un evento por su ID
router.get('/eventos/:evento_id', EventController.getEventById);

// Obtener eventos según el estado o nombre del evento
router.get('/eventos/search', EventController.searchEvents);

// Crear un nuevo evento
router.post('/eventos', EventController.createEvent);

// Actualizar un evento existente
router.put('/eventos/:evento_id', EventController.updateEvent);

// Eliminar un evento
router.delete('/eventos/:evento_id', EventController.deleteEvent);

module.exports = router;
