// src/App.jsx
import React from 'react';
import { MapProvider } from './context/MapContext';
import MapPage from './components/Main/MapPage';


function App() {
  return (
    <MapProvider>
      <MapPage />
    </MapProvider>
  );
}

export default App;
