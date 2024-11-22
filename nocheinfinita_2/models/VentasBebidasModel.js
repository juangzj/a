const connection = require('../database/bds');

// Obtener todas las ventas de bebidas
const getAllVentasBebidas = async () => {
  const query = 'SELECT * FROM VentasBebidas';
  try {
    const [results] = await connection.promise().query(query);
    return results;
  } catch (err) {
    console.error('Error al obtener las ventas de bebidas:', err);
    throw err;
  }
};

// Obtener una venta de bebida por ID
const getVentaBebidaById = async (venta_id) => {
  const query = 'SELECT * FROM VentasBebidas WHERE venta_id = ?';
  try {
    const [results] = await connection.promise().query(query, [venta_id]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error('Error al obtener la venta de bebida:', err);
    throw err;
  }
};

// Crear una nueva venta de bebida
const createVentaBebida = async (venta) => {
  const query = `
    INSERT INTO VentasBebidas (fecha_venta, hora_venta, bebida, categoria, cantidad, precio_unitario, evento_id, metodo_pago)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [results] = await connection.promise().query(query, [
      venta.fecha_venta,
      venta.hora_venta,
      venta.bebida,
      venta.categoria,
      venta.cantidad,
      venta.precio_unitario,
      venta.evento_id,
      venta.metodo_pago
    ]);
    return results;
  } catch (err) {
    console.error('Error al crear la venta de bebida:', err);
    throw err;
  }
};

// Actualizar una venta de bebida
const updateVentaBebida = async (venta_id, venta) => {
  const query = `
    UPDATE VentasBebidas SET
      fecha_venta = ?, 
      hora_venta = ?, 
      bebida = ?, 
      categoria = ?, 
      cantidad = ?, 
      precio_unitario = ?, 
      evento_id = ?, 
      metodo_pago = ?
    WHERE venta_id = ?`;

  try {
    const [results] = await connection.promise().query(query, [
      venta.fecha_venta,
      venta.hora_venta,
      venta.bebida,
      venta.categoria,
      venta.cantidad,
      venta.precio_unitario,
      venta.evento_id,
      venta.metodo_pago,
      venta_id
    ]);

    // Verificar si se actualizó algún registro
    if (results.affectedRows === 0) {
      throw new Error('No se encontró la venta con el ID proporcionado');
    }
    return results;
  } catch (err) {
    console.error('Error al actualizar la venta de bebida:', err);
    throw err;  // Volver a lanzar el error para que lo maneje el controlador
  }
};


// Eliminar una venta de bebida
const deleteVentaBebida = async (venta_id) => {
  const query = 'DELETE FROM VentasBebidas WHERE venta_id = ?';
  try {
    const [results] = await connection.promise().query(query, [venta_id]);
    return results;
  } catch (err) {
    console.error('Error al eliminar la venta de bebida:', err);
    throw err;
  }
};

// Buscar ventas de bebidas por categoría o por id_evento
const searchVentasBebidas = async (categoria, id_evento) => {
  let query = "SELECT * FROM VentasBebidas WHERE 1=1";
  const params = [];

  if (categoria) {
    query += " AND categoria = ?";
    params.push(categoria);
  }

  if (id_evento) {
    query += " AND evento_id = ?";
    params.push(id_evento);
  }

  try {
    const [results] = await connection.promise().query(query, params);
    return results; // Devuelve un array con los resultados
  } catch (err) {
    console.error("Error al buscar las ventas de bebidas:", err);
    throw err;
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
