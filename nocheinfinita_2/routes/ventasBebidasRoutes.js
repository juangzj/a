const express = require('express');
const VentasBebidasController = require('../controllers/VentasBebidasController');

const router = express.Router();

// Buscar ventas de bebidas por categoria o por id_evento
router.get('/ventasbebidas/search', (req, res) => {
  console.log("Parámetros recibidos en la búsqueda de Ventas de Bebidas:", req.query); // Muestra los parámetros enviados en la petición
  VentasBebidasController.searchVentasBebidas(req, res);
});


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



module.exports = router;
