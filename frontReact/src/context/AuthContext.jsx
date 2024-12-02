import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, maxAge = 3600) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para decodificar el token y extraer los datos del usuario
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);  
      // Asegúrate de que el token incluya el id del usuario
      return {
        id: decoded.id,  
        username: decoded.username, 
        role: decoded.role,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Verifica el token en la cookie al cargar la aplicación
  useEffect(() => {
    const token = getCookie('access_token');
    if (token) {
      const userData = decodeToken(token); 
      if (userData) {
        setUser(userData); 
      }
    } else {
      setUser(null);
    }
    setLoading(false); 
  }, []);

  
  const login = (token, userData) => {
    setCookie('access_token', token, 3600); 
    setUser(userData); 
  };
  
  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/users/logout',
        {},
        { withCredentials: true } // Esto asegura que las cookies se envían al backend
      );
      setUser(null); // Limpia el estado del usuario en el frontend
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
