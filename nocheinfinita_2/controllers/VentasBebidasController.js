const VentasBebidasModel = require('../models/VentasBebidasModel');

// Controlador para obtener todas las ventas de bebidas
const getAllVentasBebidas = async (req, res) => {
  try {
    const ventas = await VentasBebidasModel.getAllVentasBebidas();
    res.status(200).json(ventas);
  } catch (err) {
    console.error('Error al obtener las ventas de bebidas:', err);
    res.status(500).json({ error: 'Error al obtener las ventas de bebidas' });
  }
};

// Controlador para obtener una venta de bebida por ID
const getVentaBebidaById = async (req, res) => {
  const venta_id = parseInt(req.params.venta_id, 10);
  if (isNaN(venta_id)) {
    return res.status(400).json({ error: 'ID inválido, debe ser un número' });
  }

  try {
    const venta = await VentasBebidasModel.getVentaBebidaById(venta_id);
    if (venta) {
      res.status(200).json(venta);
    } else {
      res.status(404).json({ error: 'Venta de bebida no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la venta de bebida:', err);
    res.status(500).json({ error: 'Error al obtener la venta de bebida' });
  }
};

// Controlador para crear una nueva venta de bebida
const createVentaBebida = async (req, res) => {
  const venta = req.body;

  // Validación de los campos requeridos
  if (!venta.fecha_venta || !venta.hora_venta || !venta.bebida || !venta.categoria ||
    !venta.cantidad || !venta.precio_unitario || !venta.metodo_pago) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await VentasBebidasModel.createVentaBebida(venta);
    res.status(201).json({ message: 'Venta de bebida creada', id: result.insertId });
  } catch (err) {
    console.error('Error al crear la venta de bebida:', err);
    res.status(500).json({ error: 'Error al crear la venta de bebida' });
  }
};

// Controlador para actualizar una venta de bebida
const updateVentaBebida = async (req, res) => {
  const { venta_id } = req.params;
  const venta = req.body;


  if (!venta.fecha_venta || !venta.hora_venta || !venta.bebida || !venta.categoria ||
    !venta.cantidad || !venta.precio_unitario || !venta.metodo_pago) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {

    const result = await VentasBebidasModel.updateVentaBebida(venta_id, venta);


    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Venta de bebida actualizada con éxito' });
    } else {

      return res.status(404).json({ error: 'Venta de bebida no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar la venta de bebida:', err);
    return res.status(500).json({ error: 'Error al actualizar la venta de bebida' });
  }
};


// Controlador para eliminar una venta de bebida
const deleteVentaBebida = async (req, res) => {
  const { venta_id } = req.params;
  try {
    const result = await VentasBebidasModel.deleteVentaBebida(venta_id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Venta de bebida eliminada' });
    } else {
      res.status(404).json({ error: 'Venta de bebida no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar la venta de bebida:', err);
    res.status(500).json({ error: 'Error al eliminar la venta de bebida' });
  }
};

 // Buscar ventas de bebidas por categoría o por id_evento
const searchVentasBebidas = async (req, res) => {
  const { categoria, id_evento } = req.query;

  try {
    const ventas = await VentasBebidasModel.searchVentasBebidas(categoria, id_evento);
    res.status(200).json(ventas); 
  } catch (err) {
    console.error("Error al buscar las ventas de bebidas:", err);
    res.status(500).json({ error: "Error al buscar las ventas de bebidas" });
  }
};

module.exports = {
  getAllVentasBebidas,
  getVentaBebidaById,
  createVentaBebida,
  updateVentaBebida,
  deleteVentaBebida,
  searchVentasBebidas,
};
