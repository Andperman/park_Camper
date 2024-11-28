import React, { useState, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapView from './MapView';
import { MapContext } from '../../../context/MapContext';
import MapService from '../../../services/MapService';

const MapPage = () => {
  const { locations, center, setLocations, setCenter } = useContext(MapContext);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (latitude && longitude) {
      // Verifica si la latitud y longitud son válidas
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (!isNaN(lat) && !isNaN(lon)) {
        // Buscar lugares cerca de las coordenadas
        const fetchedLocations = await MapService.getLocations(lat, lon);

        // Actualizar los lugares y el centro del mapa
        setLocations(fetchedLocations);
        setCenter([lat, lon]);
      } else {
        alert('Por favor, ingresa coordenadas válidas.');
      }
    } else {
      alert('Por favor, ingresa tanto latitud como longitud.');
    }
  };

  return (
    <div>
      {/* Formulario de búsqueda */}
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
