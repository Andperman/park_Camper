import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapContext } from '../../../../context/MapContext';

const MapView = () => {
  const { locations } = useContext(MapContext);
  const navigate = useNavigate();

  console.log("Ubicaciones recibidas en MapView:", locations);  // Verifica que las ubicaciones estén disponibles

  if (!locations.length) return null; // Si no hay ubicaciones, no renderiza nada.

  return (
    <>
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <div>
              <img src={location.image} alt={location.name} style={{ width: '100px' }} />
              <p
                onClick={() => navigate(`/location/${index}`)} // Usa el índice como identificador
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              >
                {location.title}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapView;
