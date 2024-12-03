import { getTokenFromCookies } from '../utils/utils.js'; 

const getLocations = async (latitude, longitude) => {
  try {
    const token = getTokenFromCookies();  
    const headers = token ? {
      'Authorization': `Bearer ${token}`,  
    } : {};

  
    const response = await fetch(`http://localhost:3000/api/locations?latitude=${latitude}&longitude=${longitude}`, {
      method: 'GET',
      headers: headers,  
    });

    if (!response.ok) {
      throw new Error(`Error fetching locations: ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar y mapear los datos de las ubicaciones
    if (data.lieux && data.lieux.length > 0) {
      return data.lieux.map(location => ({
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
        title: location.titre,
        name: location.name,
        description: location.description_es,
        image: location.photos && location.photos.length > 0 ? location.photos[0].link_large : null,
        precio: location.prix_stationnement,
        precioServicio: location.prix_services,
        fecha: location.data_fermature
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

export default { getLocations };
