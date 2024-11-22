// Importamos la conexión a la base de datos desde bds.js
const connection = require('../database/bds');

// Obtener todos los DJs
const getAllDJs = (callback) => {
  const query = 'SELECT * FROM DJs';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los DJs:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Obtener un DJ por ID
const getDjById = (dj_id, callback) => {
  const query = 'SELECT * FROM DJs WHERE dj_id = ?';
  connection.query(query, [dj_id], (err, results) => {
    if (err) {
      console.error('Error al obtener el DJ:', err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Crear un nuevo DJ
const createDj = (dj, callback) => {
  const query = `
    INSERT INTO DJs (
      nombre_dj, pais_origen, genero_musical, numero_eventos, honorarios, estado, representante_contacto, notas_adicionales, proximo_evento
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [
    dj.nombre_dj,
    dj.pais_origen,
    dj.genero_musical,
    dj.numero_eventos,
    dj.honorarios,
    dj.estado,
    dj.representante_contacto,
    dj.notas_adicionales,
    dj.proximo_evento
  ], (err, results) => {
    if (err) {
      console.error('Error al crear el DJ:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Actualizar un DJ
const updateDj = (dj_id, dj, callback) => {
  const query = `
    UPDATE DJs SET
      nombre_dj = ?, pais_origen = ?, genero_musical = ?, numero_eventos = ?, honorarios = ?, estado = ?, representante_contacto = ?, notas_adicionales = ?, proximo_evento = ?
    WHERE dj_id = ?`;

  connection.query(query, [
    dj.nombre_dj,
    dj.pais_origen,
    dj.genero_musical,
    dj.numero_eventos,
    dj.honorarios,
    dj.estado,
    dj.representante_contacto,
    dj.notas_adicionales,
    dj.proximo_evento,
    dj_id
  ], (err, results) => {
    if (err) {
      console.error('Error al actualizar el DJ:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Eliminar un DJ
const deleteDj = (dj_id, callback) => {
  const query = 'DELETE FROM DJs WHERE dj_id = ?';
  connection.query(query, [dj_id], (err, results) => {
    if (err) {
      console.error('Error al eliminar el DJ:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Buscar DJs por nombre_dj o estado
const searchDJs = async (nombre_dj, estado) => {
  let query = "SELECT * FROM DJs WHERE 1=1";
  let queryParams = [];

  // Verificar si se busca por nombre_dj
  if (nombre_dj) {
    query += " AND LOWER(nombre_dj) LIKE ?";
    queryParams.push(`%${nombre_dj.toLowerCase()}%`); // Búsqueda parcial
  }

  // Verificar si se busca por estado
  if (estado) {
    query += " AND LOWER(estado) = ?";
    queryParams.push(estado.toLowerCase());
  }

  try {
    const [results] = await connection.promise().query(query, queryParams);
    return results; // Devuelve un array con los resultados
  } catch (err) {
    console.error("Error al buscar los DJs:", err);
    throw err;
  }
};





module.exports = {
  getAllDJs,
  getDjById,
  createDj,
  updateDj,
  deleteDj,
  searchDJs
};
