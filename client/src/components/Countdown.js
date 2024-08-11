import React, { useEffect, useState } from 'react';
import '../styles/Banner.css';

const Countdown = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      {timeLeft > 0 ? (
        <p>{`Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
      ) : (
        <p>Banner expired</p>
      )}
    </div>
  );
};

export default Countdown;
