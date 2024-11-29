
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManualLocations = () => {
  // Estado para las ubicaciones creadas manualmente
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

  // Cargar las ubicaciones creadas manualmente
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/locations/manual');  // Cambia la URL según la ruta correcta de tu API
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

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
      await axios.post('http://localhost:3000/api/locations', formData);  // Cambia la URL según la ruta de tu API
      alert('Ubicación creada exitosamente');
      
      // Volver a cargar las ubicaciones después de crear una nueva
      const response = await axios.get('http://localhost:3000/api/locations/manual');
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
      await axios.delete(`http://localhost:3000/api/locations/${id}`);
      alert('Ubicación eliminada exitosamente');
      
      // Volver a cargar las ubicaciones después de eliminar
      const response = await axios.get('http://localhost:3000/api/locations/manual');
      setLocations(response.data);
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Error eliminando la ubicación');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Ubicación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de la Imagen"
        />
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Latitud"
          required
        />
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Longitud"
          required
        />
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          type="number"
          name="precioServicio"
          value={formData.precioServicio}
          onChange={handleChange}
          placeholder="Precio Servicio"
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
        <button type="submit">Crear Ubicación</button>
      </form>

      <h2>Ubicaciones Creadas Manualmente</h2>
      <ul>
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
