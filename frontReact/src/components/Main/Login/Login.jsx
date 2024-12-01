// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showRegister, setShowRegister] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/users/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 document.cookie = `access_token=${data.token}; path=/;`;
//                 onLogin(data); // Notifica al componente padre que el login fue exitoso
//             } else {
//                 alert(data.error || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };

//     return (
//         <div>
//             {showRegister ? (
//                 <Register onClose={() => setShowRegister(false)} />
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <h2>Login</h2>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Login</button>
//                     <button type="button" onClick={() => setShowRegister(true)}>
//                         Create Account
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// const Register = ({ onClose }) => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/users/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, email, password }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 alert('User registered successfully. Please log in.');
//                 onClose();
//             } else {
//                 alert(data.error || 'Registration failed');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleRegister}>
//             <h2>Register</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Register</button>
//             <button type="button" onClick={onClose}>
//                 Cancel
//             </button>
//         </form>
//     );
// };

// export default Login;
