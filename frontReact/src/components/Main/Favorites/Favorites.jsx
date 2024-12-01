// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user')); // Asumiendo que el usuario está en localStorage
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!user || user.role !== 'user') {
//         alert('Solo los usuarios con rol "user" pueden ver favoritos.');
//         return;
//       }

//       try {
//         const response = await axios.get(`/api/users/user/${user.id}`);
//         setFavorites(response.data);
//       } catch (error) {
//         console.error('Error al obtener favoritos:', error);
//       }
//     };

//     fetchFavorites();
//   }, [user]);

//   const handleRemoveFavorite = async (favoriteId) => {
//     try {
//       await axios.delete(`/api/users/${favoriteId}`);
//       setFavorites(favorites.filter((fav) => fav.favorite_id !== favoriteId));
//     } catch (error) {
//       console.error('Error al eliminar favorito:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Mis Favoritos</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {favorites.map((fav) => (
//           <div
//             key={fav.favorite_id}
//             style={{
//               border: '1px solid gray',
//               borderRadius: '8px',
//               margin: '10px',
//               padding: '10px',
//               width: '250px',
//             }}
//           >
//             <h3>{fav.mongo_title}</h3>
//             <button
//               onClick={() => navigate(`/location/${fav.mongo_id}`)}
//               style={{ display: 'block', marginBottom: '10px' }}
//             >
//               Ver detalle
//             </button>
//             <button onClick={() => handleRemoveFavorite(fav.favorite_id)}>
//               Quitar de favoritos
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Favorites;
