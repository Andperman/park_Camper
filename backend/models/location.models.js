import mongoose from 'mongoose';  // Usamos import en lugar de require

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    title: String,
    name: String,
    description: String,
    image: String,
    precio: String,  // Cambiado a String
    precioServicio: String,  // Cambiado a String
    fecha: Date
});

const Location = mongoose.model('Location', locationSchema);

export default Location;  // Usamos export default para exportar el modelo
