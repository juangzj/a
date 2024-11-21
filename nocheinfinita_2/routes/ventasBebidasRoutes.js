const express = require('express');
const VentasBebidasController = require('../controllers/VentasBebidasController');

const router = express.Router();

// Obtener todas las ventas de bebidas
router.get('/ventasbebidas', VentasBebidasController.getAllVentasBebidas);

// Obtener una venta de bebida por ID
router.get('/ventasbebidas/:venta_id', VentasBebidasController.getVentaBebidaById);

// Crear una nueva venta de bebida
router.post('/ventasbebidas', VentasBebidasController.createVentaBebida);

// Actualizar una venta de bebida
router.put('/ventasbebidas/:venta_id', VentasBebidasController.updateVentaBebida);

// Eliminar una venta de bebida
router.delete('/ventasbebidas/:venta_id', VentasBebidasController.deleteVentaBebida);

// Buscar ventas de bebidas por categoría o método de pago
router.get('/ventasbebidas/search', VentasBebidasController.searchVentasBebidas);

module.exports = router;
