const express = require('express');
const {
  getAllSistemasIluminacion,
  getSistemaIluminacion,
  createSistemaIluminacion,
  editSistemaIluminacion,
  deleteSistemaIluminacion,
} = require('../controllers/SistemaIluminancionController');

const router = express.Router();

// Rutas para el CRUD de sistemas de iluminación
router.get('/sistemailuminacion', getAllSistemasIluminacion);
router.get('/sistemailuminacion/:id', getSistemaIluminacion);
router.post('/sistemailuminacion', createSistemaIluminacion);
router.put('/sistemailuminacion/:id', editSistemaIluminacion);
router.delete('/sistemailuminacion/:id', deleteSistemaIluminacion);

module.exports = router;
