// const Location = require('../models/location.model');  // Importa el modelo Location

// // Crear una nueva ubicación
// const createLocation = async (data) => {
//     try {
//         const location = new Location(data);  // Crear un nuevo documento de Location
//         await location.save();  // Guardar en la base de datos
//         return location;
//     } catch (error) {
//         throw new Error(`Error al crear la ubicación: ${error.message}`);
//     }
// };

// // Obtener todas las ubicaciones
// const getAllLocations = async () => {
//     try {
//         return await Location.find();  // Encuentra todas las ubicaciones en la base de datos
//     } catch (error) {
//         throw new Error(`Error al obtener las ubicaciones: ${error.message}`);
//     }
// };

// // Eliminar una ubicación por ID
// const deleteLocation = async (id) => {
//     try {
//         const location = await Location.findByIdAndDelete(id);  // Buscar y eliminar por ID
//         return location;  // Devuelve la ubicación eliminada
//     } catch (error) {
//         throw new Error(`Error al eliminar la ubicación: ${error.message}`);
//     }
// };

// module.exports = {
//     createLocation,
//     getAllLocations,
//     deleteLocation,
// };

// import Location from '../models/location.models.js'; // Modelo de MongoDB

// // Crear una nueva ubicación
// export const createLocation = async (data) => {
//   try {
//     const newLocation = new Location(data); // Crear una nueva instancia del modelo
//     await newLocation.save(); // Guardar en la base de datos
//     return newLocation; // Retornar la ubicación creada
//   } catch (error) {
//     throw new Error(`Error creating location: ${error.message}`);
//   }
// };

// // Obtener ubicaciones dentro de un rango
// export const getLocationsInRange = async (latitude, longitude, range) => {
//   try {
//     // Buscar ubicaciones en MongoDB dentro del rango especificado
//     return await Location.find({
//       latitude: { $gte: latitude - range, $lte: latitude + range },
//       longitude: { $gte: longitude - range, $lte: longitude + range },
//     });
//   } catch (error) {
//     throw new Error(`Error fetching locations in range: ${error.message}`);
//   }
// };

// // Eliminar una ubicación por ID
// export const deleteLocation = async (id) => {
//   try {
//     const deletedLocation = await Location.findByIdAndDelete(id); // Buscar y eliminar por ID
//     return deletedLocation; // Retornar la ubicación eliminada
//   } catch (error) {
//     throw new Error(`Error deleting location: ${error.message}`);
//   }
// };

// export default { createLocation, getLocationsInRange, deleteLocation};