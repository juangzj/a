const express = require('express');
const cors = require('cors');
const app = express();
const portEventos = 3001;


app.use(cors());


app.use(express.json());

// rutas para eventos 
const eventRoutes = require('./routes/eventRoutes');
app.use('/NocheInfinita/Eventos', eventRoutes);


app.listen(portEventos, () => {
  console.log(`Microservicio Eventos corriendo en el puerto ${portEventos}`);
});
