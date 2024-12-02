import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSearch,FaSignOutAlt, FaStar, FaTree, FaMap } from 'react-icons/fa';  // Nuevos íconos para las páginas

const Header = () => {
  const { user, loading, logout } = useAuth();
  if (loading) return <div>Loading...</div>;
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          {/* Condición para usuarios normales */}
          {user.role === 'user' && (
            <>
              <li>
                <Link to="/">
                  <FaSearch /> {/* Icono de lupa para MapPage */}
                </Link>
              </li>
              <li>
                <Link to="/favorites">
                  <FaStar /> {/* Icono de estrella para Favorites */}
                </Link>
              </li>
              <li>
                <Link to="/rules">
                  <FaTree /> {/* Icono de pino para Rules */}
                </Link>
              </li>
              <li>
                <button onClick={logout}>
                  <FaSignOutAlt /> {/* Icono de salida para Logout */}
                </button>
              </li>
            </>
          )}

          {/* Condición para administradores */}
          {user.role === 'admin' && (
            <>
              <li>
                <Link to="/">
                  <FaSearch /> {/* Icono de lupa para MapPage */}
                </Link>
              </li>
              <li>
                <Link to="/manual-locations">
                  <FaMap /> {/* Icono de mapa pequeño para Manual Locations */}
                </Link>
              </li>
              <li>
                <Link to="/rules">
                  <FaTree /> {/* Icono de pino para Rules */}
                </Link>
              </li>
              <li>
                <button onClick={logout}>
                  <FaSignOutAlt /> {/* Icono de salida para Logout */}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
