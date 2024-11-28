// config/db_mongo.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/locationsDB');
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Detener el proceso si no se puede conectar
  }
};

export default connectDB;  // Exporta la función de conexión como default
