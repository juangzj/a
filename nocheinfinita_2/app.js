const express = require('express');
const cors = require('cors');


const appEventos = express();      
const appDJs = express();         
const appReservasVIP = express();  
const appVentasBebidas = express(); 

// Puertos de cada microservicio
const portEventos = 3001;
const portDJs = 3003;
const portReservasVIP = 3002;
const portVentasBebidas = 3004;  

// Configuración común para todos los microservicios
appEventos.use(cors());
appEventos.use(express.json());

appDJs.use(cors());
appDJs.use(express.json());

appReservasVIP.use(cors());
appReservasVIP.use(express.json());

appVentasBebidas.use(cors());
appVentasBebidas.use(express.json());

// Rutas para eventos
const eventRoutes = require('./routes/eventRoutes');
appEventos.use('/NocheInfinita/Eventos', eventRoutes);

// Rutas para DJs
const djRoutes = require('./routes/djRoutes');
appDJs.use('/NocheInfinita/DJs', djRoutes);

// Rutas para ReservasVIP
const reservasVIPRoutes = require('./routes/reservasVIPRoutes');
appReservasVIP.use('/NocheInfinita/ReservasVIP', reservasVIPRoutes);

// Rutas para VentasBebidas
const ventasBebidasRoutes = require('./routes/ventasBebidasRoutes');
appVentasBebidas.use('/NocheInfinita/VentasBebidas', ventasBebidasRoutes);

// Iniciar el servidor para el microservicio de eventos
appEventos.listen(portEventos, () => {
  console.log(`Microservicio Eventos corriendo en el puerto ${portEventos}`);
});

// Iniciar el servidor para el microservicio de DJs
appDJs.listen(portDJs, () => {
  console.log(`Microservicio DJs corriendo en el puerto ${portDJs}`);
});

// Iniciar el servidor para el microservicio de ReservasVIP
appReservasVIP.listen(portReservasVIP, () => {
  console.log(`Microservicio ReservasVIP corriendo en el puerto ${portReservasVIP}`);
});

// Iniciar el servidor para el microservicio de VentasBebidas
appVentasBebidas.listen(portVentasBebidas, () => {
  console.log(`Microservicio VentasBebidas corriendo en el puerto ${portVentasBebidas}`);
});
