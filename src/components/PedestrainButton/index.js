import React from 'react';
import PropTypes from 'prop-types';

const PedestrianButton = ({ onClick }) => (
  <button onClick={onClick} aria-label="Pedestrian Request Button">
    Pedestrian
  </button>
);

PedestrianButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PedestrianButton;
