// Button.js
import React, { useState } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import AuthPopup from './AuthPopup'; // Create AuthPopup component in a separate file

export function Button() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      {/* Use a button instead of Link here */}
      <button className='btn' color='white' onClick={handleOpenPopup}>
        Sign Up
      </button>

      {isPopupOpen && <AuthPopup onClose={handleClosePopup} />}
    </div>
  );
}