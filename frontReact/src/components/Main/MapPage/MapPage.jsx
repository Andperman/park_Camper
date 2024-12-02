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
      <div style={{ position: 'absolute',
        top: '680px',  // Ajuste para que no se sobreponga con el header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        maxWidth: '220px',
        backgroundColor: '#fff',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  }}>
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          alignItems: 'center',
        }}>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitud"
            style={{  padding: '5px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              marginBottom: '10px', }}
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitud"
            style={{ padding: '5px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              marginBottom: '0px', }}
          />
          <button type="submit" style={{ padding: '5px 5px',
            backgroundColor:"beige",
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', }}>
             🔍 
          </button>
        </form>
      </div>


      {/* Botón para filtrar las ubicaciones creadas */}
      <button
        onClick={handleFilterCreated}
        style={{ position: 'absolute',
          bottom: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 10px',
          backgroundColor: '#ffcc00',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 1000,}}>
        ⭐ LOS MEJORES
      </button>

      {/* Mapa */}
      <MapContainer center={center} zoom={12} style={{ height: '80vh', width: '100%' }}>
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