import React from 'react';
import PropTypes from 'prop-types';

const RedLight = ({ isActive }) => (
  <div className={`light ${isActive ? 'red' : ''}`} aria-label="Red Light"></div>
);

RedLight.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default RedLight;
