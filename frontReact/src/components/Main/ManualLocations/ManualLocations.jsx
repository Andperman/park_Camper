
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromCookies } from '../../../utils/utils';
const ManualLocations = () => {
  const [locations, setLocations] = useState([]);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    title: '',
    name: '',
    description: '',
    image: '',
    precio: '',
    precioServicio: '',
    fecha: '',
  });

  // Obtener el token de la cookie
  const token = getTokenFromCookies('access_token');

  // Cargar las ubicaciones creadas manualmente
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/locations/manual', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [token]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar los datos al backend para crear la nueva ubicación
      await axios.post('http://localhost:3000/api/locations', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
      }); 
      alert('Ubicación creada exitosamente');
      
      // Volver a cargar las ubicaciones después de crear una nueva
      const response = await axios.get('http://localhost:3000/api/locations/manual', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      setLocations(response.data);
      
      // Limpiar el formulario
      setFormData({
        latitude: '',
        longitude: '',
        title: '',
        name: '',
        description: '',
        image: '',
        precio: '',
        precioServicio: '',
        fecha: '',
      });
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Error creando la ubicación');
    }
  };

  // Eliminar una ubicación
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/locations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      alert('Ubicación eliminada exitosamente');
      
      // Volver a cargar las ubicaciones después de eliminar
      const response = await axios.get('http://localhost:3000/api/locations/manual', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      setLocations(response.data);
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Error eliminando la ubicación');
    }
  };

  return (
    <div className="manual-locations-container">
      <h2>NUEVOS LUGARES</h2>
      <form onSubmit={handleSubmit} className="manual-form">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitud:</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitud:</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            name="precio"
            id="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="precioServicio">Precio Servicio:</label>
          <input
            type="number"
            name="precioServicio"
            id="precioServicio"
            value={formData.precioServicio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Crear Ubicación</button>
      </form>


      <h2>Lugares creados </h2>
      <ul className="locations-list">
        {locations.map((location) => (
          <li key={location._id}>
            <h3>{location.title}</h3>
            <p>{location.name}</p>
            <p>{location.description}</p>
            {location.image && <img src={location.image} alt={location.title} />}
            <button onClick={() => handleDelete(location._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualLocations;
