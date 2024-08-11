// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import Countdown from './components/Countdown';
import './styles/App.css';

const App = () => {
  const [bannerSettings, setBannerSettings] = useState({
    description: '',
    time: 0,
    link: '',
    isVisible: false,
  });

  const [showBanner, setShowBanner] = useState(bannerSettings.isVisible);

  // Fetch initial banner settings from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        if (response.data.length > 0) {
          setBannerSettings(response.data[0]); // Assuming one record
          setShowBanner(response.data[0].isVisible);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Update banner visibility and timer
  useEffect(() => {
    if (bannerSettings.isVisible) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }

    if (bannerSettings.time > 0 && bannerSettings.isVisible) {
      const timer = setTimeout(() => {
        setShowBanner(false);
        handleUpdateSettings({
          ...bannerSettings,
          isVisible: false,
        });
      }, bannerSettings.time * 1000);

      return () => clearTimeout(timer);
    }
  }, [bannerSettings]);

  const handleUpdateSettings = (updatedSettings) => {
    setBannerSettings(updatedSettings);

    // Update settings in the backend
    axios.put('http://localhost:5000/api/data/1', updatedSettings) // Assuming ID = 1 for update
      .then((response) => console.log('Update successful:', response.data))
      .catch((error) => console.error('Error updating data:', error));
  };

  return (
    <div className="container">
      {showBanner && (
        <Banner
          isVisible={bannerSettings.isVisible}
          description={bannerSettings.description}
          time={<Countdown time={bannerSettings.time} />}
          link={bannerSettings.link}
        />
      )}
      <Dashboard
        setBannerSettings={handleUpdateSettings} // Pass function to update settings
        bannerSettings={bannerSettings}
      />
    </div>
  );
};

export default App;
