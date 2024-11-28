import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MapContext } from '../../../../context/MapContext';

const MapView = () => {
  const { locations } = useContext(MapContext);

  if (!locations.length) return null;

  return (
    <>
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <div>
              <img src={location.image} alt={location.name} style={{ width: '100px' }} />
              <p>{location.title}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapView;
