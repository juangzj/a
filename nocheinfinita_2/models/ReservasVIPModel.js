const connection = require('../database/bds');

// Obtener todas las reservas VIP
const getAllReservasVIP = (callback) => {
  const query = 'SELECT * FROM ReservasVIPs';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las reservas VIP:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Obtener una reserva VIP por ID
const getReservaVIPById = (reserva_id, callback) => {
  const query = 'SELECT * FROM ReservasVIPs WHERE reserva_id = ?';
  connection.query(query, [reserva_id], (err, results) => {
    if (err) {
      console.error('Error al obtener la reserva VIP:', err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Crear una nueva reserva VIP
const createReservaVIP = (reserva, callback) => {
  const query = `
    INSERT INTO ReservasVIPs (
      mesa_id, cliente_nombre, cliente_telefono, evento_id, costo_reserva, estado, numero_personas, servicios_incluidos, notas_adicionales
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [
    reserva.mesa_id,
    reserva.cliente_nombre,
    reserva.cliente_telefono,
    reserva.evento_id,
    reserva.costo_reserva,
    reserva.estado,
    reserva.numero_personas,
    reserva.servicios_incluidos,
    reserva.notas_adicionales
  ], (err, results) => {
    if (err) {
      console.error('Error al crear la reserva VIP:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Actualizar una reserva VIP existente
const updateReservaVIP = (reserva_id, reserva, callback) => {
  const query = `
    UPDATE ReservasVIPs SET
      mesa_id = ?, cliente_nombre = ?, cliente_telefono = ?, evento_id = ?, costo_reserva = ?, estado = ?, 
      numero_personas = ?, servicios_incluidos = ?, notas_adicionales = ?
    WHERE reserva_id = ?`;

  connection.query(query, [
    reserva.mesa_id,
    reserva.cliente_nombre,
    reserva.cliente_telefono,
    reserva.evento_id,
    reserva.costo_reserva,
    reserva.estado,
    reserva.numero_personas,
    reserva.servicios_incluidos,
    reserva.notas_adicionales,
    reserva_id
  ], (err, results) => {
    if (err) {
      console.error('Error al actualizar la reserva VIP:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Eliminar una reserva VIP
const deleteReservaVIP = (reserva_id, callback) => {
  const query = 'DELETE FROM ReservasVIPs WHERE reserva_id = ?';
  connection.query(query, [reserva_id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la reserva VIP:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Buscar reservas VIP por cliente o estado
const searchReservasVIP = async (cliente_nombre, estado) => {
  let query = "SELECT * FROM ReservasVIPs WHERE 1=1";
  let params = [];

  if (cliente_nombre) {
    query += " AND cliente_nombre LIKE ?";
    params.push(`%${cliente_nombre}%`);
  }

  if (estado) {
    query += " AND estado = ?";
    params.push(estado);
  }

  try {
    const [results] = await connection.promise().query(query, params);
    return results; // Devuelve un array con los resultados
  } catch (err) {
    console.error("Error al buscar las reservas VIP:", err);
    throw err;
  }
};


module.exports = {
  getAllReservasVIP,
  getReservaVIPById,
  createReservaVIP,
  updateReservaVIP,
  deleteReservaVIP,
  searchReservasVIP
};
