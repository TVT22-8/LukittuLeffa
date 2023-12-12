// AuthPopup.js
import React, { useState } from 'react';
import './AuthPopup.css';
import { AuthProvider, useAuth } from './pages/jsxfiles/Logging';
import { Card, Button } from 'react-bootstrap';

const AuthPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Register:', username, password);
    onClose();
  };


  const { login } = useAuth();

  const handleLogin = async () => {
    await login(username, password);
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
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default AuthPopup;
