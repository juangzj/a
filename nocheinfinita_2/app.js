const express = require('express');
const cors = require('cors');

// Crear las instancias de express
const appEventos = express();  // Para el microservicio de eventos
const appDJs = express();      // Para el microservicio de DJs

const portEventos = 3001;
const portDJs = 3002; // Puerto para el microservicio de DJs

// Configuración común para ambos microservicios
appEventos.use(cors());
appEventos.use(express.json());

appDJs.use(cors());
appDJs.use(express.json());

// Rutas para eventos
const eventRoutes = require('./routes/eventRoutes');
appEventos.use('/NocheInfinita/Eventos', eventRoutes);

// Rutas para DJs
const djRoutes = require('./routes/djRoutes');
appDJs.use('/NocheInfinita/DJs', djRoutes);

// Iniciar el servidor para el microservicio de eventos
appEventos.listen(portEventos, () => {
  console.log(`Microservicio Eventos corriendo en el puerto ${portEventos}`);
});

// Iniciar el servidor para el microservicio de DJs
appDJs.listen(portDJs, () => {
  console.log(`Microservicio DJs corriendo en el puerto ${portDJs}`);
});
