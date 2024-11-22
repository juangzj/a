const express = require('express');
const ReservasVIPController = require('../controllers/ReservasVIPController');

const router = express.Router();

// Buscar reservas VIP por cliente o estado
router.get('/reservasvip/search', (req, res) => {
  console.log('Parámetros recibidos en la búsqueda de Reservas VIP:', req.query); // Muestra los parámetros enviados en la petición
  ReservasVIPController.searchReservasVIP(req, res);
});


// Obtener todas las reservas VIP
router.get('/reservasvip', ReservasVIPController.getAllReservasVIP);

// Obtener una reserva VIP por ID
router.get('/reservasvip/:reserva_id', ReservasVIPController.getReservaVIPById);

// Crear una nueva reserva VIP
router.post('/reservasvip', ReservasVIPController.createReservaVIP);

// Actualizar una reserva VIP
router.put('/reservasvip/:reserva_id', ReservasVIPController.updateReservaVIP);

// Eliminar una reserva VIP
router.delete('/reservasvip/:reserva_id', ReservasVIPController.deleteReservaVIP);



module.exports = router;
