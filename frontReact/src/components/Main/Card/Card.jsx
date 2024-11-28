import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContext } from '../../../context/MapContext';

const Card = () => {
  const { id } = useParams(); // Obtén el ID desde la URL
  const { locations } = useContext(MapContext);
  const navigate = useNavigate(); // Hook para navegación
  const location = locations[parseInt(id)]; // Encuentra la ubicación correspondiente

  if (!location) return <p>Location not found.</p>;

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      {/* Botón "X" para cerrar */}
      <button
        onClick={() => navigate('/')} // Redirige al mapa
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: 'red',
          fontWeight: 'bold',
        }}
      >
        X
      </button>

      {/* Contenido de la tarjeta */}
      <h2>{location.title}</h2>
      <h3>{location.name}</h3>
      <img src={location.image} alt={location.title} style={{ width: '300px' }} />
      <p>
        <strong>Coordinates:</strong> {location.latitude}, {location.longitude}
      </p>
      <p>{location.precio}</p>
      <p>{location.precioServicio}</p>
      <p>{location.fecha}</p>
      <p>{location.description}</p>

    </div>
  );
};

export default Card;
