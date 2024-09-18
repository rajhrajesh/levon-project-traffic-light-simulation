import React from 'react';
import PropTypes from 'prop-types';

const EmergencyOverride = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={isActive ? "Deactivate Emergency" : "Activate Emergency"}
    style={{ backgroundColor: isActive ? 'red' : 'green' }}
  > 
    {isActive ? 'Emergency Active' : 'Emergency Inactive'}
  </button>
);

EmergencyOverride.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EmergencyOverride;
