import React, { createContext, useState } from 'react';

export const MapContext = React.createContext();

export const MapProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([40.4165, -3.70256]); 
  return (
    <MapContext.Provider value={{ locations, setLocations, center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
};
