// File: src/components/Fireworks.js
import React from 'react';
import Confetti from 'react-confetti';

const Fireworks = ({ width, height, isVisible }) => {
  return isVisible ? <Confetti width={width} height={height} /> : null;
};

export default Fireworks;
