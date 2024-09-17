import React from 'react';
import PropTypes from 'prop-types';

const GreenLight = ({ isActive }) => (
  <div className={`light ${isActive ? 'green' : ''}`} aria-label="Green Light"></div>
);

GreenLight.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default GreenLight;
