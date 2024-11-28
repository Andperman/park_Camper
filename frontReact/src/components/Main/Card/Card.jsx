import React from 'react';

const Card = ({ location }) => {
  return (
    <div>
      <h2>{location.title}</h2>
      <img src={location.image} alt={location.title} style={{ width: '300px' }} />
      <p>{location.description}</p>
      <p><strong>Coordinates:</strong> {location.latitude}, {location.longitude}</p>
    </div>
  );
};

export default Card;
