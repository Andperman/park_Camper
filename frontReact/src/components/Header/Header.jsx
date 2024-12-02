import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, loading,logout } = useAuth();
  if (loading) return <div>Loading...</div>;
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <header>
      <nav>
        <ul>
          {/* Condición para usuarios normales */}
          {user.role === 'user' && (
            <>
              <li>
                <Link to="/">MapPage</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}

          {/* Condición para administradores */}
          {user.role === 'admin' && (
            <>
              <li>
                <Link to="/">MapPage</Link>
              </li>
              <li>
                <Link to="/manual-locations">Manual Locations</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
