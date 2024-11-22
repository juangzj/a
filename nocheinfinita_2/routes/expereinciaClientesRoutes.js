const express = require('express');
const {
  createExperienciaCliente,
  deleteExperienciaCliente,
  editExperienciaCLiente,
  getAllExprienciasCliente,
  getExperienciaCliente,
} = require('../controllers/ExpereinciaClientesController');

const router = express.Router();

router.get('/experienciaclientes', getAllExprienciasCliente);
router.get('/experienciaclientes/:id', getExperienciaCliente);
router.post('/experienciaclientes', createExperienciaCliente);
router.put('/experienciaclientes', editExperienciaCLiente);
router.delete('/experienciaclientes/:id', deleteExperienciaCliente);

module.exports = router;
