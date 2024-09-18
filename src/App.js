import React, { useContext, useEffect } from 'react';
import GreenLight from './components/GreenLight';
import YellowLight from './components/YellowLight';
import RedLight from './components/RedLight';
import Pedestrian from './components/Pedestrain';
import EmergencyOverride from './components/EmergencyOverride';
import { TrafficLightContext } from './context/TrafficLightContext';
import './App.css';

const App = () => {
  const { state, dispatch } = useContext(TrafficLightContext);
  const { currentLight, timer, emergencyOverride, pedestrianRequested } = state;

  useEffect(() => {
    const switchLight = () => {
      dispatch({ type: 'CHANGE_LIGHT' });
    };

    if (emergencyOverride) {
      console.log('Emergency override activated: switching to red light.');
      return;
    }

    if (timer > 0) {
      const countdown = setTimeout(() => dispatch({ type: 'TICK' }), 1000);
      return () => clearTimeout(countdown);
    } else {
      switchLight();
    }
  }, [timer, emergencyOverride, dispatch]);

  const handlePedestrianRequest = () => {
    if (currentLight === 'green' || currentLight === 'yellow') {
      dispatch({ type: 'PEDESTRIAN_REQUEST' });
      console.log('Pedestrian request registered. Light will turn red after the current cycle.');
    }
  };

  const handleEmergencyOverride = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE' });
    console.log(emergencyOverride ? 'Emergency override deactivated.' : 'Emergency override activated.');
  };

  return (
    <div>
      <div className="traffic-light">
        <GreenLight isActive={currentLight === 'green'} />
        <YellowLight isActive={currentLight === 'yellow'} />
        <RedLight isActive={currentLight === 'red'} />
      </div>
      <div className="timer-display">
        Time left: {timer} seconds
      </div>
      <Pedestrian onClick={handlePedestrianRequest} isActive={pedestrianRequested} />
      <EmergencyOverride
        isActive={emergencyOverride}
        onClick={handleEmergencyOverride}
      />
    </div>
  );
}

export default App;
