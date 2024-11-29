import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const poolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL === 'true',
};

const pool = new Pool(poolConfig);

console.log("PostgreSQL pool created successfully");

export { pool }; 
