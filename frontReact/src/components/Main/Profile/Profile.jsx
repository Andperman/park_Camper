import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';  // El contexto de autenticación
import axios from 'axios';

const Profile = () => {
    const { user, logout } = useAuth();  // Aquí obtenemos el usuario desde el contexto (si está autenticado)
    const [profile, setProfile] = useState(null);  // Estado para almacenar los datos del perfil
    const [loading, setLoading] = useState(true);  // Estado para controlar la carga

    useEffect(() => {
        const getProfile = async () => {
            if (!user) return;  // Si no hay usuario autenticado, no hacer la solicitud

            setLoading(true);  // Iniciar la carga

            try {
                // Hacer una solicitud GET al backend con el email del usuario
                const response = await axios.get('http://localhost:3000/api/user/email', {
                    params: { email: user.email },  // Pasamos el email del usuario autenticado
                    withCredentials: true,  // Asegúrate de enviar las cookies si son necesarias
                });
                setProfile(response.data);  // Guardamos los datos del perfil
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);  // Finaliza la carga
            }
        };

        getProfile();
    }, [user]);  // Rehacer la solicitud cuando el usuario cambie

    if (loading) {
        return <p>Loading...</p>;  // Mostrar un mensaje mientras se carga el perfil
    }

    if (!profile) {
        return <p>No profile data found</p>;  // Si no se encontró el perfil
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
