// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';      // Import global CSS styles
import App from './App';   // Import the main App component
import reportWebVitals from './reportWebVitals'; // Optional: For measuring performance

// Render the App component into the root element of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: For measuring performance
reportWebVitals();
