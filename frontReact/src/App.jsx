// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MapProvider } from './context/MapContext';
// import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
// import MapPage from './components/Main/MapPage';
// import Card from './components/Main/Card';
// import ManualLocations from './components/Main/ManualLocations';
// // import Favorites from './components/Main/Favorites';
// import Login from './components/Main/Login';  // Nuevo componente Login
// import Profile from './components/Main/Profile';  // Nuevo componente Profile

// function App() {
//   return (
//     <Router>
//       <AuthProvider> {/* Proveedor de autenticación */}
//         <MapProvider>
//           <Routes>
//             <Route path="/" element={<MapPage />} />
//             <Route path="/location/:id" element={<Card />} />
//             <Route path="/manual-locations" element={<ManualLocations />} />
//             {/* <Route path="/favorites" element={<Favorites />} /> */}
//             <Route path="/login" element={<Login />} />  {/* Ruta para login */}
//             <Route path="/profile" element={<Profile />} />  {/* Ruta para el perfil */}
//           </Routes>
//         </MapProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapProvider } from './context/MapContext';
import MapPage from './components/Main/MapPage';
import Card from './components/Main/Card';
import { AuthProvider } from './context/AuthContext'; 
import ManualLocations from './components/Main/ManualLocations';
import Favorites from './components/Main/Favorites';
function App() {
  return (
    <Router>
      <MapProvider>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/location/:id" element={<Card />} />
          <Route path="/manual-locations" element={<ManualLocations />} />
          {/* <Route path="/favorites" element={<Favorites />} /> */}
        </Routes>
      </MapProvider>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MapProvider } from './context/MapContext';  // Importa el contexto de mapas
// // import { FavoritesProvider } from './context/FavoritesContext';  // Importa el contexto de favoritos
// // import { AuthProvider } from './context/AuthContext';  // Importa el contexto de autenticación
// import MapPage from './components/Main/MapPage';
// import Card from './components/Main/Card';
// import Favorites from './components/Main/Favorites';  // Importa el componente de Favoritos

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <MapProvider>
//           <FavoritesProvider>  {/* Envuelve todo con el FavoritesProvider */}
//             <Routes>
//               <Route path="/" element={<MapPage />} />
//               <Route path="/location/:id" element={<Card />} />
//               <Route path="/favorites" element={<Favorites />} /> {/* Ruta para ver los favoritos */}
//             </Routes>
//           </FavoritesProvider>
//         </MapProvider>
//       </AuthProvider>
//     </Router>
//   );
// }