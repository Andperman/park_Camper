import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const { login, user } = useAuth(); // Extraemos el login y user desde el contexto de autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  // useEffect para redirigir al usuario una vez que esté autenticado
  useEffect(() => {
    if (user) {
      navigate('/');  // Redirigir solo después de que el usuario esté disponible
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Response received:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data); 
        login(data.token, { role: data.role, email: data.email }); 
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData); 
        alert(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error); 
    }
  };

  return (
    <div>
      {showRegister ? (
        <Register onClose={() => setShowRegister(false)} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setShowRegister(true)}>
            Create Account
          </button>
        </form>
      )}
    </div>
  );
};

const Register = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully. Please log in.');
        onClose();
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default Login;
