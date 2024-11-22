const express = require('express');
const cors = require('cors');
const bdm = require('./database/bdm'); // Conexión a la base de datos (bdm)
const bds = require('./database/bds'); // Conexión a la base de datos (bds)

// Crear las aplicaciones de microservicios
const appEventos = express();
const appDJs = express();
const appReservasVIP = express();
const appVentasBebidas = express();
const appExperienciaCliente = express();
const appSistemaIluminacion = express();

// Puertos de cada microservicio
const portEventos = 3001;
const portDJs = 3003;
const portReservasVIP = 3002;
const portVentasBebidas = 3004;
const portExperienciaCliente = 3005;
const portSistemaIluminacion = 3006;

// Configuración común para todos los microservicios
appEventos.use(cors());
appEventos.use(express.json());

appDJs.use(cors());
appDJs.use(express.json());

appReservasVIP.use(cors());
appReservasVIP.use(express.json());

appVentasBebidas.use(cors());
appVentasBebidas.use(express.json());

appExperienciaCliente.use(cors());
appExperienciaCliente.use(express.json());

appSistemaIluminacion.use(cors());
appSistemaIluminacion.use(express.json());

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

// Rutas para ExperienciaClientes
const experienciasClientesRoutes = require('./routes/expereinciaClientesRoutes');
appExperienciaCliente.use('/NocheInfinita/ExperienciaClientes', experienciasClientesRoutes);

// Rutas para SistemaIluminacion
const sistemaIluminacionRoutes = require('./routes/sistemaIluminacionRoutes');
appSistemaIluminacion.use('/NocheInfinita/SistemaIluminacion', sistemaIluminacionRoutes);

// Iniciar el servidor para cada microservicio
appEventos.listen(portEventos, () => {
  console.log(`Microservicio Eventos corriendo en el puerto ${portEventos}`);
});

appDJs.listen(portDJs, () => {
  console.log(`Microservicio DJs corriendo en el puerto ${portDJs}`);
});

appReservasVIP.listen(portReservasVIP, () => {
  console.log(`Microservicio ReservasVIP corriendo en el puerto ${portReservasVIP}`);
});

appVentasBebidas.listen(portVentasBebidas, () => {
  console.log(`Microservicio VentasBebidas corriendo en el puerto ${portVentasBebidas}`);
});

appExperienciaCliente.listen(portExperienciaCliente, () => {
  console.log(`Microservicio ExperienciaCliente corriendo en el puerto ${portExperienciaCliente}`);
});

appSistemaIluminacion.listen(portSistemaIluminacion, () => {
  console.log(`Microservicio SistemaIluminacion corriendo en el puerto ${portSistemaIluminacion}`);
});

// Conexión a la base de datos para 'bdm'
(async () => {
  try {
    await bdm.authenticate();
    console.log('Conexión exitosa a la base de datos bdm');
  } catch (error) {
    console.log(`El error de conexión con bdm es: ${error}`);
  }
})();

// Conexión a la base de datos para 'bds'
(async () => {
  try {
    await bds.authenticate();
    console.log('Conexión exitosa a la base de datos bds');
  } catch (error) {
    console.log(`El error de conexión con bds es: ${error}`);
  }
})();
