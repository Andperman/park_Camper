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




// export default Card;

// import React, { useContext, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MapContext } from '../../../context/MapContext';
// import axios from 'axios';

// const Card = () => {
//   const { id } = useParams(); // Obtén el ID desde la URL
//   const { locations } = useContext(MapContext);
//   const navigate = useNavigate(); // Hook para navegación
//   const location = locations[parseInt(id)]; // Encuentra la ubicación correspondiente
//   const [isFavorite, setIsFavorite] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user')); // Asumiendo que el usuario está en localStorage

//   if (!location) return <p>Location not found.</p>;

//   const handleToggleFavorite = async () => {
//     if (!user || user.role !== 'user') {
//       alert('Solo los usuarios con rol "user" pueden gestionar favoritos.');
//       return;
//     }

//     try {
//       if (isFavorite) {
//         // Desmarcar como favorito
//         await axios.delete(`/api/users/${user.id}/${location.id}`); // Ajusta si `location.id` es diferente
//         setIsFavorite(false);
//       } else {
//         // Marcar como favorito
//         await axios.post('/api/users', {
//           user_id: user.id,
//           mongo_id: location.id, // Ajusta si el identificador de MongoDB es diferente
//           mongo_title: location.title,
//         });
//         setIsFavorite(true);
//       }
//     } catch (error) {
//       console.error('Error al gestionar favoritos:', error);
//     }
//   };

//   return (
//     <div style={{ position: 'relative', padding: '20px' }}>
//       {/* Botón "X" para cerrar */}
//       <button
//         onClick={() => navigate('/')} // Redirige al mapa
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           background: 'transparent',
//           border: 'none',
//           fontSize: '20px',
//           cursor: 'pointer',
//           color: 'red',
//           fontWeight: 'bold',
//         }}
//       >
//         X
//       </button>

//       {/* Estrella para marcar/desmarcar favorito */}
//       {user && user.role === 'user' && (
//         <button
//           onClick={handleToggleFavorite}
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'transparent',
//             border: 'none',
//             fontSize: '20px',
//             cursor: 'pointer',
//             color: isFavorite ? 'gold' : 'gray',
//           }}
//         >
//           ★
//         </button>
//       )}

//       {/* Contenido de la tarjeta */}
//       <h2>{location.title}</h2>
//       <h3>{location.name}</h3>
//       <img src={location.image} alt={location.title} style={{ width: '300px' }} />
//       <p>
//         <strong>Coordinates:</strong> {location.latitude}, {location.longitude}
//       </p>
//       <p>{location.precio}</p>
//       <p>{location.precioServicio}</p>
//       <p>{location.fecha}</p>
//       <p>{location.description}</p>
//     </div>
//   );
// };

// export default Card;


// import React, { useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MapContext } from '../../../context/MapContext';
// import { FavoritesContext } from '../../../context/FavoritesContext';
// import { AuthContext } from '../../../context/AuthContext';

// const Card = () => {
//   const { id } = useParams();
//   const { locations } = useContext(MapContext);
//   const { addFavorite } = useContext(FavoritesContext);
//   const { user } = useContext(AuthContext); // Obtenemos el usuario logueado
//   const navigate = useNavigate();
//   const location = locations[parseInt(id)];

//   if (!location) return <p>Location not found.</p>;

//   const handleFavorite = () => {
//     if (user) {
//       addFavorite(location); // Añade a favoritos
//     } else {
//       alert('Debes estar logueado para añadir favoritos');
//     }
//   };

//   return (
//     <div style={{ position: 'relative', padding: '20px' }}>
//       {/* Botón "X" para cerrar */}
//       <button
//         onClick={() => navigate('/')}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           background: 'transparent',
//           border: 'none',
//           fontSize: '20px',
//           cursor: 'pointer',
//           color: 'red',
//           fontWeight: 'bold',
//         }}
//       >
//         X
//       </button>

//       {/* Contenido de la tarjeta */}
//       <h2>{location.title}</h2>
//       <h3>{location.name}</h3>
//       <img src={location.image} alt={location.title} style={{ width: '300px' }} />
//       <p>
//         <strong>Coordinates:</strong> {location.latitude}, {location.longitude}
//       </p>
//       <p>{location.precio}</p>
//       <p>{location.precioServicio}</p>
//       <p>{location.fecha}</p>
//       <p>{location.description}</p>

//       {/* Botón de estrella para añadir a favoritos */}
//       {user && (
//         <button
//           onClick={handleFavorite}
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'transparent',
//             border: 'none',
//             fontSize: '20px',
//             cursor: 'pointer',
//             color: 'gold',
//           }}
//         >
//           ★
//         </button>
//       )}
//     </div>
//   );
// };

// export default Card;
