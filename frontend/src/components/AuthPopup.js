// AuthPopup.js
import React, { useState } from 'react';
import './AuthPopup.css';
import { useAuth } from './pages/jsxfiles/Logging';
import { Card, Button } from 'react-bootstrap';

const AuthPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');



  const { login, register } = useAuth();

  const handleLogin = async () => {
    await login(username, password);
    onClose();
  };

  const handleRegister = async () => {
    await register(uname, pwd);
    console.log('Register:', uname, pwd);
    onClose();
  };

  return (
    <div className="auth-popup">
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <h2>Register</h2>
      <label>
        Username:
        <input type="uname" value={uname} onChange={(e) => setUname(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
      </label>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default AuthPopup;
