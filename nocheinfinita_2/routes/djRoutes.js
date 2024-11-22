const express = require('express');
const DjController = require('../controllers/DjController');

const router = express.Router();

// Buscar DJs por nombre y estado
router.get('/djs/search', (req, res) => {
  console.log('Parámetros recibidos en la búsqueda de DJs:', req.query); // Muestra los parámetros enviados en la petición
  DjController.searchDJs(req, res);
});


// Obtener todos los DJs
router.get('/djs', DjController.getAllDJs);

// Obtener un DJ por su ID
router.get('/djs/:dj_id', DjController.getDjById);


// Crear un nuevo DJ
router.post('/djs', DjController.createDj);

// Actualizar un DJ
router.put('/djs/:dj_id', DjController.updateDj);

// Eliminar un DJ
router.delete('/djs/:dj_id', DjController.deleteDj);

module.exports = router;
