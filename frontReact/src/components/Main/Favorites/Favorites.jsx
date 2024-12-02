
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesContext"; 

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Obtener los favoritos y la función de eliminar
  const navigate = useNavigate(); // Hook para navegación

  const handleRemoveFavorite = (favoriteId) => {
    removeFavorite(favoriteId); // Eliminar de favoritos
  };

  if (favorites.length === 0) {
    return <p>No tienes favoritos.</p>;
  }

  return (
    <div>
      <h1>Mis Favoritos</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favorites.map((fav) => (
          <div
            key={fav.id} 
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              margin: "10px",
              padding: "10px",
              width: "250px",
            }}
          >
            <h3>{fav.title}</h3>
            <button
              onClick={() => navigate(`/location/${fav.id}`)} 
              style={{ display: "block", marginBottom: "10px" }}
            >
              Ver detalle
            </button>
            <button onClick={() => handleRemoveFavorite(fav.id)}>
              Quitar de favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
