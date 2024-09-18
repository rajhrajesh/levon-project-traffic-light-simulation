import React, { createContext, useReducer } from 'react';

const TrafficLightContext = createContext();

const initialState = {
  currentLight: 'green',
  timer: 10,
  pedestrianRequested: false,
  emergencyOverride: false,
};

const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      if (state.currentLight === 'green') {
        if (state.pedestrianRequested) {
          return { ...state, currentLight: 'red', timer: 7, pedestrianRequested: false };
        }
        return { ...state, currentLight: 'yellow', timer: 3 };
      } else if (state.currentLight === 'yellow') {
        return { ...state, currentLight: 'red', timer: 7 };
      } else if (state.currentLight === 'red') {
        return { ...state, currentLight: 'green', timer: 10 };
      }
      return state;
    case 'TICK':
      return { ...state, timer: state.timer > 0 ? state.timer - 1 : 0 };
    case 'PEDESTRIAN_REQUEST':
      return { ...state, pedestrianRequested: true };
    case 'EMERGENCY_OVERRIDE':
      return {
        ...state,
        emergencyOverride: !state.emergencyOverride,
        currentLight: !state.emergencyOverride ? 'red' : state.currentLight,
        timer: !state.emergencyOverride ? 7 : state.timer,
      };
    default:
      return state;
  }
};

const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export { TrafficLightContext, TrafficLightProvider };
