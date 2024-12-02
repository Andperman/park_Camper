import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContext } from '../../../context/MapContext';
import { useFavorites } from '../../../context/FavoritesContext'; 

const Card = () => {
  const { id } = useParams(); 
  const { locations } = useContext(MapContext); 
  const navigate = useNavigate(); 
  const location = locations[parseInt(id)]; 
  const { favorites, addFavorite, removeFavorite } = useFavorites(); 

  if (!location) return <p>Location not found.</p>;


  const handleFavoriteToggle = () => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === location.id);
    
    if (isAlreadyFavorite) {
      removeFavorite(location.id); 
    } else {
      addFavorite(location); 
    }
  };

  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <button
        onClick={() => navigate('/')} 
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

      {/* Botón de favorito */}
      <button onClick={handleFavoriteToggle}>
        {favorites.some(fav => fav.id === location.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>
    </div>
  );
};

export default Card;
