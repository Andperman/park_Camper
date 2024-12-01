// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             const response = await fetch('/api/users/me', {
//                 headers: { Authorization: `Bearer ${getCookie('access_token')}` },
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data);
//             } else {
//                 console.error('Failed to fetch user data');
//             }
//         };
//         fetchUser();
//     }, []);

//     const handleLogout = () => {
//         document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
//         window.location.reload(); // O redirigir a login
//     };

//     return user ? (
//         <div>
//             <h2>Profile</h2>
//             <p>Username: {user.username}</p>
//             <p>Email: {user.email}</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     ) : (
//         <p>Loading...</p>
//     );
// };

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

// export default Profile;
