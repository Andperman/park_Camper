
import fetch from 'node-fetch';  //para hacer solicitudes HTTP
import Location from '../models/location.models.js';  

export const getLocations = async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        const response = await fetch(
            `http://guest.park4night.com/services/V4.1/lieuxGetFilter.php?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        // Devuelve los datos al frontend
        res.json(data);
        // guarda los datos en MongoDB  (lógica ducplicados)
        if (data.lieux && data.lieux.length > 0) {
            for (const location of data.lieux) {
                const existingLocation = await Location.findOne({ title: location.titre });

                if (!existingLocation) {
                    const newLocation = new Location({
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude),
                        title: location.titre,
                        name: location.name,
                        description: location.description_es,
                        image: location.photos?.[0]?.link_large || null,
                        precio: location.prix_stationnement,
                        precioServicio: location.prix_services,
                        fecha: location.data_fermature ? new Date(location.data_fermature) : null,
                    });

                    await newLocation.save();
                }
            }
        }
    } catch (error) {
        console.error('Error fetching or saving locations:', error);
        res.status(500).json({ error: 'Error fetching or saving locations' });
    }
};

// CREAMOS A MANO CON EL FORMULARIO NUEVA LOCALIZACIÓN
export const createLocation = async (req, res) => {
    const locationData = req.body;
    try {
        const newLocation = new Location({
            ...locationData, 
            manual: true,
        });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ error: 'Error creating location' });
    }
};

// ELIMINAR LOCALIZACIÓN MANUAL POR ID
export const deleteLocation = async (req, res) => {
    const { id } = req.params;

    try {
        const location = await Location.findById(id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        if (!location.manual) {
            return res.status(403).json({ error: 'You can only delete manually created locations' });
        }
        const deletedLocation = await Location.findByIdAndDelete(id);
        res.status(200).json({ message: 'Location deleted successfully', data: deletedLocation });
    } catch (error) {
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Error deleting location' });
    }
};


// OBTENER SOLO LAS UBICACIONES MANUALES(PARA VISIÓN ADMIN)
export const getManualLocations = async (req, res) => {
    try {
        // Obtiene solo las ubicaciones creadas manualmente
        const manualLocations = await Location.find({ manual: true });
        res.status(200).json(manualLocations);
    } catch (error) {
        console.error('Error fetching manual locations:', error);
        res.status(500).json({ error: 'Error fetching manual locations' });
    }
};


export default { getLocations, createLocation,deleteLocation,getManualLocations };






// import fetch from 'node-fetch';
// import Location from '../models/location.models.js';  // Importa el modelo de la ubicación

// // Obtener lugares (de la API externa y de la base de datos)
// const getLocations = async (req, res) => {
//   const { latitude, longitude } = req.query;

//   try {
//     // Paso 1: Consultar ubicaciones guardadas en MongoDB
//     const dbLocations = await Location.find({
//       latitude: { $gte: parseFloat(latitude) - 0.45, $lte: parseFloat(latitude) + 0.45 },
//       longitude: { $gte: parseFloat(longitude) - 0.45, $lte: parseFloat(longitude) + 0.45 },
//     });

//     // Paso 2: Llamada a la API externa
//     const response = await fetch(
//       `http://guest.park4night.com/services/V4.1/lieuxGetFilter.php?latitude=${latitude}&longitude=${longitude}`
//     );
//     const apiData = await response.json();

//     // Paso 3: Procesar datos de la API externa
//     let apiLocations = [];
//     if (apiData.lieux && apiData.lieux.length > 0) {
//       apiLocations = apiData.lieux.map((location) => ({
//         latitude: parseFloat(location.latitude),
//         longitude: parseFloat(location.longitude),
//         title: location.titre,
//         name: location.name,
//         description: location.description_es,
//         image: location.photos?.[0]?.link_large || null,
//         precio: location.prix_stationnement,
//         precioServicio: location.prix_services,
//         fecha: location.data_fermature ? new Date(location.data_fermature) : null,
//       }));
//     }

//     // Paso 4: Combinar resultados y enviarlos al cliente
//     const combinedLocations = [...dbLocations, ...apiLocations];  // Combina las ubicaciones de MongoDB con las de la API
//     res.json(combinedLocations);
//   } catch (error) {
//     console.error('Error fetching or combining locations:', error);
//     res.status(500).json({ error: 'Error fetching or combining locations' });
//   }
// };

// // Crear un nuevo lugar (manual)
// const createLocation = async (req, res) => {
//   const locationData = req.body;

//   try {
//     const newLocation = new Location(locationData);
//     await newLocation.save();
//     res.status(201).json(newLocation);
//   } catch (error) {
//     console.error('Error creating location:', error);
//     res.status(500).json({ error: 'Error creating location' });
//   }
// };

// // Eliminar una ubicación por ID
// const deleteLocation = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedLocation = await Location.findByIdAndDelete(id);
//     if (deletedLocation) {
//       res.status(200).json({ message: 'Location deleted successfully', data: deletedLocation });
//     } else {
//       res.status(404).json({ error: 'Location not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting location:', error);
//     res.status(500).json({ error: 'Error deleting location' });
//   }
// };

// export default { getLocations, createLocation, deleteLocation };
