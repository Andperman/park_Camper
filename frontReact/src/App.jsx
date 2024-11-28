import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapProvider } from './context/MapContext';
import MapPage from './components/Main/MapPage';
import Card from './components/Main/Card';

function App() {
  return (
    <Router>
      <MapProvider>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/location/:id" element={<Card />} />
        </Routes>
      </MapProvider>
    </Router>
  );
}

export default App;
