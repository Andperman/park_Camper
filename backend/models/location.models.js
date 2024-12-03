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
