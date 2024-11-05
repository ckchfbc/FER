// src/components/ThemeToggle.js
import React from 'react';
import { Button } from 'react-bootstrap';

const ThemeToggle = ({ isDarkTheme, toggleTheme }) => {
  return (
    <Button variant={isDarkTheme ? 'light' : 'dark'} onClick={toggleTheme} className="ms-3">
      {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;
