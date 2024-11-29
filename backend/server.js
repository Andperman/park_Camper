import express from 'express';
import cors from 'cors';
import connectDB from './config/db_mongo.js'; 
import { pool } from './config/db_pgSQL.js'; 
import locationController from './controllers/location.controller.js'; 

// Rutas 
import userRoutes from './routes/user.routes.js'; // Rutas usuarios


const app = express();

//Middleware
app.use(cors()); 
app.use(express.json()); // Permite interpretar cuerpos JSON


connectDB(); 

// Rutas
app.get('/getLocations', locationController.getLocations);
// app.use('/api/locations', locationRoutes); // Prefijo para rutas de ubicaciones
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




// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db_mongo.js';  // Importa la conexión a MongoDB
// import locationController from './controllers/location.controller.js';  // Importa el controlador de la ruta
// import connectPG from './config/db_pgSQL.js';  // Importa la conexión a PostgreSQL
// import userRoutes from './routes/user.routes.js'; 

// const app = express();

// // Habilita CORS para todas las solicitudes
// app.use(cors());

// app.use(express.json()); // Necesario para que el servidor pueda interpretar cuerpos JSON

// // Conecta con MongoDB
// connectDB();
// connectPG();
// // Ruta para obtener las ubicaciones
// app.get('/getLocations', locationController.getLocations);


// //Rutas
// app.use('/api/users', userRoutes); 


// // Configura el puerto del servidor
// const port = 3000;
// app.listen(port, () => {
//   console.log(Servidor corriendo en http://localhost:${port});
// });    se puede organizar mejor?