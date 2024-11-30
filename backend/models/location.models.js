// import mongoose from 'mongoose';  // Usamos import en lugar de require

// const locationSchema = new mongoose.Schema({
//     latitude: Number,
//     longitude: Number,
//     title: String,
//     name: String,
//     description: String,
//     image: String,
//     precio: String,  // Cambiado a String
//     precioServicio: String,  // Cambiado a String
//     fecha: Date
// });

// const Location = mongoose.model('Location', locationSchema);

// export default Location;  // Usamos export default para exportar el modelo
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  title: { type: String, required: true },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  precio: { type: Number },
  precioServicio: { type: Number },
  fecha: { type: Date },
  manual: { type: Boolean, default: false }, // Campo para ver manual o no 
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
