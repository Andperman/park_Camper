import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno antes de usarlas
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Detener el proceso si no se puede conectar
  }
};

export default connectDB;
