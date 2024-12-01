// // src/context/FavoritesContext.js
// import React, { createContext, useState } from 'react';

// // Crea el contexto para los favoritos
// export const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   // Aquí puedes agregar las funciones para manejar los favoritos (agregar, quitar, etc.)
//   const addFavorite = (favorite) => {
//     setFavorites((prevFavorites) => [...prevFavorites, favorite]);
//   };

//   const removeFavorite = (favoriteId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((fav) => fav.id !== favoriteId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };
