import express from 'express';
import cors from 'cors';
import connectDB from './config/db_mongo.js'; 
import { pool } from './config/db_pgSQL.js'; 
// import locationController from './controllers/location.controller.js'; 
import locationRoutes from './routes/location.routes.js';
// Rutas 
import userRoutes from './routes/user.routes.js'; // Rutas usuarios


const app = express();

//Middleware
app.use(cors()); 
app.use(express.json()); 


connectDB(); 

// Rutas
// app.get('/getLocations', locationController.getLocations);
// app.use('/api/locations', locationRoutes); // Prefijo para rutas de ubicaciones
app.use('/api', locationRoutes); //rutas localización
app.use('/api/users', userRoutes); // Prefijo rutas de usuarios


const port = 3000;
app.listen(port, () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos PostgreSQL:', err);
    } else {
      console.log('Conexión a PostgreSQL exitosa:', res.rows);
    }
  });
});





