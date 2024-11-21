const express = require('express');
const DjController = require('../controllers/DjController');

const router = express.Router();

// Obtener todos los DJs
router.get('/djs', DjController.getAllDJs);

// Obtener un DJ por su ID
router.get('/djs/:dj_id', DjController.getDjById);

// Buscar DJs por nombre y estado
router.get('/djs/search', DjController.searchDJs);

// Crear un nuevo DJ
router.post('/djs', DjController.createDj);

// Actualizar un DJ
router.put('/djs/:dj_id', DjController.updateDj);

// Eliminar un DJ
router.delete('/djs/:dj_id', DjController.deleteDj);

module.exports = router;
