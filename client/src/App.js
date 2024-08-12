import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import Countdown from './components/Countdown';
import './styles/App.css';

const App = () => {
  const [bannerSettings, setBannerSettings] = useState({
    description: '',
    time: 0,
    link: '',
    isVisible: true,
  });

  const [showBanner, setShowBanner] = useState(bannerSettings.isVisible);

  useEffect(() => {
    axios.get('https://tuf-dashboard-iota.vercel.app/api/data')
      .then((response) => {
        if (response.data.length > 0) {
          setBannerSettings(response.data[0]);
          setShowBanner(response.data[0].isVisible);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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

    axios.put('https://tuf-dashboard-iota.vercel.app/api/data/1', updatedSettings)
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
        setBannerSettings={handleUpdateSettings}
        bannerSettings={bannerSettings}
      />
    </div>
  );
};

export default App;
