
import express from 'express';
import cors from 'cors';
import connectDB from './config/db_mongo.js';
import { pool } from './config/db_pgSQL.js'; 
import locationRoutes from './routes/location.routes.js';
import userRoutes from './routes/user.routes.js'; 

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true, 
}));

app.use(express.json()); 

connectDB(); 

// Rutas
app.use('/api', locationRoutes);  
app.use('/api/users', userRoutes);  

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos PostgreSQL:', err);
    } else {
      console.log('Conexión a PostgreSQL exitosa:', res.rows);
    }
  });
});
