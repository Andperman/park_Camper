import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { MapContext } from '../../../../context/MapContext';

const MapView = () => {
  const { locations } = useContext(MapContext);
  const navigate = useNavigate();

  if (!locations.length) return null;

  return (
    <>
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <div>
              <img src={location.image} alt={location.name} style={{ width: '100px' }} />
              {/* Redirige al usuario al hacer clic en el título */}
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
