// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Crea el contexto
// const AuthContext = createContext();

// // Proveedor del contexto
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Verificar si el usuario está logueado (mira el token en localStorage o cookies)
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // O cookies si usas ese método
//     if (token) {
//       // Decodificar el token o hacer una solicitud para obtener los detalles del usuario
//       axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
//         .then(response => setUser(response.data))
//         .catch(() => setUser(null));
//     }
//   }, []);

//   const login = (token, userData) => {
//     localStorage.setItem('token', token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook para usar el contexto en otros componentes
// export const useAuth = () => useContext(AuthContext);
