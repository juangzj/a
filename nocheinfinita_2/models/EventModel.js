// Importamos la conexión a la base de datos desde bds.js
const connection = require('../database/bds');

// Modelo de Evento
class EventModel {
  // Obtener todos los eventos
  static getAllEvents(callback) {
    const query = 'SELECT * FROM Eventos';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los eventos:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  // Obtener un evento por ID
  static getEventById(evento_id, callback) {
    const query = 'SELECT * FROM Eventos WHERE evento_id = ?';
    connection.query(query, [evento_id], (err, results) => {
      if (err) {
        console.error(`Error al obtener el evento con ID ${evento_id}:`, err);
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }

  // Crear un nuevo evento
  static createEvent(evento, callback) {
    const query = `
            INSERT INTO Eventos (
                nombre_evento, fecha, hora_inicio, hora_fin, dj_id, capacidad_maxima, descripcion, costo_entrada, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
      evento.nombre_evento,
      evento.fecha,
      evento.hora_inicio,
      evento.hora_fin,
      evento.dj_id,
      evento.capacidad_maxima,
      evento.descripcion,
      evento.costo_entrada,
      evento.estado
    ], (err, results) => {
      if (err) {
        console.error('Error al crear el evento:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  // Actualizar un evento
  static updateEvent(evento_id, evento, callback) {
    const query = `
            UPDATE Eventos SET
                nombre_evento = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, dj_id = ?, capacidad_maxima = ?, descripcion = ?, costo_entrada = ?, estado = ?
            WHERE evento_id = ?`;

    connection.query(query, [
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
    ], (err, results) => {
      if (err) {
        console.error(`Error al actualizar el evento con ID ${evento_id}:`, err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  // Eliminar un evento
  static deleteEvent(evento_id, callback) {
    const query = 'DELETE FROM Eventos WHERE evento_id = ?';
    connection.query(query, [evento_id], (err, results) => {
      if (err) {
        console.error(`Error al eliminar el evento con ID ${evento_id}:`, err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  // Buscar eventos por nombre y estado (ignorar mayúsculas y minúsculas)
  static searchEvents(nombre_evento, estado, callback) {
    let query = 'SELECT * FROM Eventos WHERE 1=1';
    let queryParams = [];

    // Compara el nombre del evento (si se proporciona) en minúsculas
    if (nombre_evento) {
      query += ' AND LOWER(nombre_evento) LIKE ?';
      queryParams.push(`%${nombre_evento.toLowerCase()}%`);
    }

    // Compara el estado (si se proporciona) en minúsculas
    if (estado) {
      query += ' AND LOWER(estado) = ?';
      queryParams.push(estado.toLowerCase());
    }

    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error al buscar los eventos:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}

module.exports = EventModel;
