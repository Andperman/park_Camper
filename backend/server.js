import express from 'express';
import cors from 'cors'; // Importa el paquete CORS
import connectDB from './config/db_mongo.js'; // Conexión a MongoDB
import Location from './models/location.models.js'; // Modelo de ubicación en MongoDB

const app = express();

// Habilita CORS para todas las solicitudes
app.use(cors());

// Conecta con MongoDB
connectDB();

app.get('/getLocations', async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    // Llamada a la API externa
    const response = await fetch(
      `http://guest.park4night.com/services/V4.1/lieuxGetFilter.php?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await response.json();

    // Devuelve los datos al frontend
    res.json(data);

    // Procesa y guarda los datos en MongoDB evitando duplicados
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
          // console.log(`Ubicación guardada: ${location.titre}`);
        } else {
          // console.log(`Ubicación ya existe: ${location.titre}`);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching or saving locations:', error);
    res.status(500).json({ error: 'Error fetching or saving locations' });
  }
});

// Configura el puerto del servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
