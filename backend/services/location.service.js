const Location = require('../models/location.model');  // Importa el modelo Location

// Crear una nueva ubicación
const createLocation = async (data) => {
    try {
        const location = new Location(data);  // Crear un nuevo documento de Location
        await location.save();  // Guardar en la base de datos
        return location;
    } catch (error) {
        throw new Error(`Error al crear la ubicación: ${error.message}`);
    }
};

// Obtener todas las ubicaciones
const getAllLocations = async () => {
    try {
        return await Location.find();  // Encuentra todas las ubicaciones en la base de datos
    } catch (error) {
        throw new Error(`Error al obtener las ubicaciones: ${error.message}`);
    }
};

// Eliminar una ubicación por ID
const deleteLocation = async (id) => {
    try {
        const location = await Location.findByIdAndDelete(id);  // Buscar y eliminar por ID
        return location;  // Devuelve la ubicación eliminada
    } catch (error) {
        throw new Error(`Error al eliminar la ubicación: ${error.message}`);
    }
};

module.exports = {
    createLocation,
    getAllLocations,
    deleteLocation,
};
