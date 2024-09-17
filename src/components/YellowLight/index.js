import React from 'react';
import PropTypes from 'prop-types';

const YellowLight = ({ isActive }) => (
  <div className={`light ${isActive ? 'yellow' : ''}`} aria-label="Yellow Light"></div>
);

YellowLight.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default YellowLight;
