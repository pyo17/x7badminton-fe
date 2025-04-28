import React from 'react';
import logo from '../assets/images/logo.png';
import './Background.css';

const Background = () => {
  return (
    <div className="background-container">
      <img 
        src={logo}
        alt="Background Logo"
        className="background-logo"
      />
    </div>
  );
};

export default Background; 