import React, { useState, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapView from './MapView';
import { getTokenFromCookies } from '../../../utils/utils'; 
import { MapContext } from '../../../context/MapContext';
import MapService from '../../../services/MapService';
import axios from 'axios';

const MapPage = () => {
  const { locations, setLocations, center, setCenter } = useContext(MapContext);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [onlyCreated, setOnlyCreated] = useState(false);  // Estado para filtrar ubicaciones

  const handleSearch = async (e) => {
    e.preventDefault();

    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (!isNaN(lat) && !isNaN(lon)) {
        // Llamada a MapService para obtener las ubicaciones
        const fetchedLocations = await MapService.getLocations(lat, lon);

        console.log("Ubicaciones obtenidas en handleSearch:", fetchedLocations);  

        // Actualizar el estado en el contexto
        setLocations(fetchedLocations);
        setCenter([lat, lon]);
      } else {
        alert('Por favor, ingresa coordenadas válidas.');
      }
    } else {
      alert('Por favor, ingresa tanto latitud como longitud.');
    }
  };

  const handleFilterCreated = async () => {
    try {
      const token = getTokenFromCookies();
      if (token) {
        const response = await axios.get('http://localhost:3000/api/locations/manual', {
          headers: {
            'Authorization': `Bearer ${token}`,  
          },
        });
  
        setLocations(response.data);  
        setOnlyCreated(true);  // Cambia el estado para indicar que solo se verán las ubicaciones creadas
      } else {
        console.error('No token found');
        alert('No se ha encontrado el token');
      }
    } catch (error) {
      console.error('Error al obtener ubicaciones creadas:', error);
      alert('Error al obtener ubicaciones creadas.');
    }
  };



  return (
    <div>
      <div style={{ margin: '10px' }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitud"
            style={{ padding: '5px' }}
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitud"
            style={{ padding: '5px', marginLeft: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 10px', marginLeft: '5px' }}>
            Buscar
          </button>
        </form>
      </div>


      {/* Botón para filtrar las ubicaciones creadas */}
      <button
        onClick={handleFilterCreated}
        style={{ padding: '5px 10px', marginLeft: '5px' }}>
        🏷️ Mostrar solo las creadas
      </button>

      {/* Mapa */}
      <MapContainer center={center} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapView locations={locations} />
      </MapContainer>
    </div>
  );
};

export default MapPage;
