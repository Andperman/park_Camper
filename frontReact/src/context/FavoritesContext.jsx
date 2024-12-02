import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext"; // Asegúrate de importar el contexto de Auth

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth(); // Obtiene el usuario desde AuthContext
  const [favorites, setFavorites] = useState([]);

  // Función para agregar un favorito
  const addFavorite = async (favorite) => {
    if (!user || !user.id) {
      console.error("User ID is missing when trying to add a favorite.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(favorite),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el favorito");
      }

      const newFavorite = await response.json();
      console.log("Favorite added:", newFavorite);

      // Actualizamos los favoritos en el estado
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    } catch (error) {
      console.error("Error al agregar el favorito:", error);
    }
  };

  const markAsFavorite = async (req, res) => {
    const { mongo_title, mongo_id } = req.body;
    const user_id = req.user.id;  // Aquí obtienes el id desde el token decodificado
  
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing when trying to add a favorite' });
    }
  
    const response = await User.markAsFavorite({ user_id, mongo_title, mongo_id });
  
    res.status(201).json({
      items_created: response,
      message: `New Favorite created for user: ${user_id}`,
      data: { mongo_title, mongo_id }
    });
  };
  

  // Función para eliminar un favorito
  const removeFavorite = async (favoriteId) => {
    if (!user || !user.id) {
      console.error("User ID is missing when trying to remove a favorite.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el favorito");
      }

      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== favoriteId)
      );
    } catch (error) {
      console.error("Error al eliminar el favorito:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
