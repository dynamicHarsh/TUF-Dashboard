import React from 'react';
import '../styles/Banner.css';

const Banner = ({ isVisible, description, time, link }) => {
  if (!isVisible) return null;

  return (
    <div className="banner">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <p>{description}</p>
        <div className="countdown">{time}</div>
      </a>
    </div>
  );
};

export default Banner;

