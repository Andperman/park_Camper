// //crud para admin LOCATION //conectarlo a MONGO
// // Crear ubicación (POST)
// const createLocation = async (req, res) => {
//     const { latitude, longitude, title, name, description, image, precio, precioServicio, fecha } = req.body;

//     try {
//         const location = new Location({
//             latitude: parseFloat(latitude),
//             longitude: parseFloat(longitude),
//             title,
//             name,
//             description,
//             image: image || null,
//             precio: parseFloat(precio),
//             precioServicio: parseFloat(precioServicio),
//             fecha: new Date(fecha)
//         });

//         // Guardamos la ubicación en MongoDB
//         const savedLocation = await location.save();

//         res.status(201).json({
//             message: "Location created successfully",
//             data: savedLocation
//         });
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({ msj: `ERROR: ${error.stack}` });
//     }
// };

// // Obtener todas las ubicaciones (GET)
// const getAllLocations = async (req, res) => {
//     try {
//         const locations = await Location.find();  // Buscar todas las ubicaciones en la base de datos
//         res.status(200).json(locations);  // Devolvemos las ubicaciones
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({ msj: `ERROR: ${error.stack}` });
//     }
// };

// // Eliminar ubicación (DELETE)
// const deleteLocation = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedLocation = await Location.findByIdAndDelete(id);  // Buscar y eliminar por ID

//         if (deletedLocation) {
//             res.status(200).json({
//                 message: `Location: ${deletedLocation.name} deleted`
//             });
//         } else {
//             res.status(404).json({ message: "Location not found" });
//         }
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//         res.status(400).json({ msj: `ERROR: ${error.stack}` });
//     }
// };

// module.exports = {
//     createLocation,
//     getAllLocations,
//     deleteLocation,
// }