const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/noche_infinita';

mongoose.connect(url);

const dbm = mongoose.connection;
dbm.on('open', () => {
  console.log("Conectado a la base de datos de MongoDB");
});
dbm.on('error', () => {
  console.log("Error al conectar a MongoDB");
});

module.exports = dbm;
