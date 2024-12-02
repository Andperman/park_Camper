import React from 'react';
import Header from './components/Header';
import Main from './components/Main'; 
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <AuthProvider> 
        <Header />
        <Main /> 
        </AuthProvider> 
      </BrowserRouter>
    </div>
  );
}

export default App;














// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { MapProvider } from './context/MapContext';
// import AuthProvider, { useAuth } from './context/AuthContext';
// import MapPage from './components/Main/MapPage';
// import Card from './components/Main/Card';
// import ManualLocations from './components/Main/ManualLocations';
// import Profile from './components/Main/Profile';
// import Login from './components/Main/Login';

// // Componente para proteger rutas
// function ProtectedRoute({ children }) {
//     const { user } = useAuth(); // Accede al usuario del contexto de autenticación
//     return user ? children : <Navigate to="/login" replace />;
// }

// function App() {
//     return (
//         <Router>
//             <AuthProvider>
//                 <MapProvider>
//                     <Routes>
//                         <Route path="/login" element={<Login />} />
//                         {/* Rutas protegidas */}
//                         <Route 
//                             path="/" 
//                             element={
//                                 <ProtectedRoute>
//                                     <MapPage />
//                                 </ProtectedRoute>
//                             } 
//                         />
//                         <Route 
//                             path="/location/:id" 
//                             element={
//                                 <ProtectedRoute>
//                                     <Card />
//                                 </ProtectedRoute>
//                             } 
//                         />
//                         <Route 
//                             path="/manual-locations" 
//                             element={
//                                 <ProtectedRoute>
//                                     <ManualLocations />
//                                 </ProtectedRoute>
//                             } 
//                         />
//                         <Route 
//                             path="/profile" 
//                             element={
//                                 <ProtectedRoute>
//                                     <Profile />
//                                 </ProtectedRoute>
//                             } 
//                         />
//                         {/* Redirige cualquier ruta desconocida al login */}
//                         <Route path="*" element={<Navigate to="/login" replace />} />
//                     </Routes>
//                 </MapProvider>
//             </AuthProvider>
//         </Router>
//     );
// }

// export default App;






















//buena 
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MapProvider } from './context/MapContext';
// import MapPage from './components/Main/MapPage';
// import Card from './components/Main/Card';
// // import { AuthProvider } from './context/AuthContext'; 
// import ManualLocations from './components/Main/ManualLocations';
// // import Favorites from './components/Main/Favorites';
// function App() {
//   return (
//     <Router>
//       <MapProvider>
//         <Routes>
//           <Route path="/" element={<MapPage />} />
//           <Route path="/location/:id" element={<Card />} />
//           <Route path="/manual-locations" element={<ManualLocations />} />
//           {/* <Route path="/favorites" element={<Favorites />} /> */}
//         </Routes>
//       </MapProvider>
//     </Router>
//   );
// }

// export default App;

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