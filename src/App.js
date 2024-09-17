import React, { useState, useEffect } from 'react';
import GreenLight from './components/GreenLight';
import YellowLight from './components/YellowLight';
import RedLight from './components/RedLight';
import PedestrianButton from './components/PedestrainButton';
import EmergencyOverrideButton from './components/EmergencyOverrideButton';

import './App.css';

const App = () => {
  const [currentLight, setCurrentLight] = useState('green');
  const [timer, setTimer] = useState(10);
  const [pedestrianRequested, setPedestrianRequested] = useState(false);
  const [emergencyOverride, setEmergencyOverride] = useState(false);

  useEffect(() => {
    const switchLight = () => {
      if (currentLight === 'green') {
        if (pedestrianRequested) {
          console.log('Pedestrian requested: switching to red light for pedestrian crossing.');
          setCurrentLight('red');
          setTimer(7);
          setPedestrianRequested(false);
        } else {
          console.log('Switching from green to yellow.');
          setCurrentLight('yellow');
          setTimer(3);
        }
      } else if (currentLight === 'yellow') {
        console.log('Switching from yellow to red.');
        setCurrentLight('red');
        setTimer(7);
      } else if (currentLight === 'red') {
        console.log('Switching from red to green.');
        setCurrentLight('green');
        setTimer(10);
      }
    };

    // Handle emergency override state
    if (emergencyOverride) {
      console.log('Emergency override activated: switching to red light.');
      setCurrentLight('red');
      setTimer(7);
      return;
    }

    // Manage the timer and light switching
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      switchLight();
    }
  }, [currentLight, timer, pedestrianRequested, emergencyOverride]);

  const handlePedestrianRequest = () => {
    if (currentLight === 'green' || currentLight === 'yellow') {
      setPedestrianRequested(true);
      console.log('Pedestrian request registered. Light will turn red after the current cycle.');
    } else {
      console.log('Already red. Pedestrian can cross.');
    }
  };

  const handleEmergencyOverride = () => {
    const newEmergencyState = !emergencyOverride;
    setEmergencyOverride(newEmergencyState);
    
    if (newEmergencyState) {
      console.log('Emergency override activated. Switching to red light.');
    } else {
      console.log('Emergency override deactivated. Normal light cycle resumed.');
    }
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
      <PedestrianButton onClick={handlePedestrianRequest} />
      <EmergencyOverrideButton
        isActive={emergencyOverride}
        onClick={handleEmergencyOverride}
      />
    </div>
  );
}

export default App;
