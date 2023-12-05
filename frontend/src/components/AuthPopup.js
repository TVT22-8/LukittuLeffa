// AuthPopup.js
import React, { useState } from 'react';
import './AuthPopup.css'; // Add styles for your popup

const AuthPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Implement your registration logic
    console.log('Register:', username, password);
    onClose();
  };

  const handleLogin = () => {
    // Implement your login logic
    console.log('Login:', username, password);
    onClose();
  };

  return (
    <div className="auth-popup">
      <h2>Register/Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthPopup;