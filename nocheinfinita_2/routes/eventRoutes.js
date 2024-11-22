const express = require('express');
const EventController = require('../controllers/EventController');



const router = express.Router();

// Obtener eventos según el estado o nombre del evento
router.get('/eventos/search', (req, res) => {
  console.log('Ruta de búsqueda llamada');
  EventController.searchEvents(req, res);
});

// Obtener todos los eventos
router.get('/eventos', (req, res) => {
  console.log('Petición recibida en /eventos');
  EventController.getAllEvents(req, res);
});


// Obtener un evento por su ID
router.get('/eventos/:evento_id', EventController.getEventById);




// Crear un nuevo evento
router.post('/eventos', EventController.createEvent);

// Actualizar un evento existente
router.put('/eventos/:evento_id', EventController.updateEvent);

// Eliminar un evento
router.delete('/eventos/:evento_id', EventController.deleteEvent);

module.exports = router;
