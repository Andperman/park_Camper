// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// // Cargar variables de entorno antes de usarlas
// dotenv.config();

// const connectPG = () => {
//   try {
//     const poolConfig = {
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       database: process.env.DB_DATABASE,
//       ssl: true, // Configurar SSL según sea necesario
//     };

//     const pool = new Pool(poolConfig);

//     console.log("PostgreSQL pool created successfully");
//     return pool;
//   } catch (error) {
//     console.error(`Error creating PostgreSQL pool: ${error.message}`);
//     process.exit(1); // Detener el proceso si no se puede crear la conexión
//   }
// };

// export default connectPG;
