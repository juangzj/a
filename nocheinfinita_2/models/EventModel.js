// Importamos la conexión a la base de datos desde bds.js
const connection = require('../database/bds');

// Obtener todos los eventos
const getAllEvents = async () => {
  const query = 'SELECT * FROM Eventos';
  try {
    const [results] = await connection.promise().query(query);
    return results;
  } catch (err) {
    console.error('Error al obtener los eventos:', err);
    throw err;
  }
};

// Obtener un evento por ID
const getEventById = async (evento_id) => {
  const query = 'SELECT * FROM Eventos WHERE evento_id = ?';
  try {
    const [results] = await connection.promise().query(query, [evento_id]);
    return results[0];
  } catch (err) {
    console.error(`Error al obtener el evento con ID ${evento_id}:`, err);
    throw err;
  }
};

// Crear un nuevo evento
const createEvent = async (evento) => {
  const query = `
    INSERT INTO Eventos (
        nombre_evento, fecha, hora_inicio, hora_fin, dj_id, capacidad_maxima, descripcion, costo_entrada, estado
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [results] = await connection.promise().query(query, [
      evento.nombre_evento,
      evento.fecha,
      evento.hora_inicio,
      evento.hora_fin,
      evento.dj_id,
      evento.capacidad_maxima,
      evento.descripcion,
      evento.costo_entrada,
      evento.estado
    ]);
    return results;
  } catch (err) {
    console.error('Error al crear el evento:', err);
    throw err;
  }
};

// Actualizar un evento
const updateEvent = async (evento_id, evento) => {
  const query = `
    UPDATE Eventos SET
        nombre_evento = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, dj_id = ?, capacidad_maxima = ?, descripcion = ?, costo_entrada = ?, estado = ?
    WHERE evento_id = ?`;

  try {
    const [results] = await connection.promise().query(query, [
      evento.nombre_evento,
      evento.fecha,
      evento.hora_inicio,
      evento.hora_fin,
      evento.dj_id,
      evento.capacidad_maxima,
      evento.descripcion,
      evento.costo_entrada,
      evento.estado,
      evento_id
    ]);
    return results;
  } catch (err) {
    console.error(`Error al actualizar el evento con ID ${evento_id}:`, err);
    throw err;
  }
};

// Eliminar un evento
const deleteEvent = async (evento_id) => {
  const query = 'DELETE FROM Eventos WHERE evento_id = ?';
  try {
    const [results] = await connection.promise().query(query, [evento_id]);
    return results;
  } catch (err) {
    console.error(`Error al eliminar el evento con ID ${evento_id}:`, err);
    throw err;
  }
};

const searchEvents = async (nombre_evento, estado) => {
  let query = 'SELECT * FROM Eventos WHERE 1=1';
  let queryParams = [];

  // Agregar nombre_evento si se proporciona
  if (nombre_evento) {
    query += ' AND LOWER(nombre_evento) LIKE ?';
    queryParams.push(`%${nombre_evento.toLowerCase()}%`);
  }

  // Agregar estado si se proporciona
  if (estado) {
    query += ' AND LOWER(estado) = ?';
    queryParams.push(estado.toLowerCase());
  }

  // Log para ver la consulta final y los parámetros
  console.log('Consulta ejecutada:', query);
  console.log('Parámetros de la consulta:', queryParams);

  try {
    const [results] = await connection.promise().query(query, queryParams);
    return results.length > 0 ? results : [];
  } catch (err) {
    console.error('Error al buscar los eventos:', err);
    throw err;
  }
};



module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, searchEvents };
