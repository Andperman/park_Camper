// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db_mongo.js';  // Importa la conexión a MongoDB
import locationController from './controllers/location.controller.js';  // Importa el controlador de la ruta

const app = express();

// Habilita CORS para todas las solicitudes
app.use(cors());

// Conecta con MongoDB
connectDB();

// Ruta para obtener las ubicaciones
app.get('/getLocations', locationController.getLocations);

// // Configura otras rutas (Ejemplo con rutas de usuario)
// const userRoutes = require("./routes/user.routes");
// app.use('/api/user', userRoutes);

// Configura el puerto del servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
