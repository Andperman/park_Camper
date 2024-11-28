import express from 'express';
import cors from 'cors'; // Importa el paquete CORS

const app = express();

// Habilita CORS para todas las solicitudes (para todos los orígenes)
app.use(cors());


app.get('/getLocations', async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const response = await fetch(`http://guest.park4night.com/services/V4.1/lieuxGetFilter.php?latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});