import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = ({ setBannerSettings, bannerSettings }) => {
  const [description, setDescription] = useState(bannerSettings.description);
  const [time, setTime] = useState(bannerSettings.time);
  const [link, setLink] = useState(bannerSettings.link);
  const [isVisible, setIsVisible] = useState(bannerSettings.isVisible);

  const ensureHttps = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedSettings = { 
      description, 
      time, 
      link: ensureHttps(link), 
      isVisible 
    };

    axios.put('http://localhost:5000/api/data/1', updatedSettings)
      .then((response) => {
        setBannerSettings(updatedSettings);
        setDescription('');
        setTime('');
        setLink('');
        setIsVisible(false);
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  const handleVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Banner Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Banner Timer (seconds):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label>Banner Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <label>Show Banner:</label>
          <input
            type="checkbox"
            id="toggle"
            className="checkbox"
            checked={isVisible}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="toggle" className="switch"></label>
        </div>
        <button className="button" type="submit">Update</button>
      </form>
    </div>
  );
};

export default Dashboard;
