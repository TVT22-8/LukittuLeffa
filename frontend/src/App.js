// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Movie from './components/pages/Movie';
import Group from './components/pages/Group';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import User from './components/pages/User';

import { AuthProvider } from './components/pages/jsxfiles/Logging';


const App = () => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const deleteUser = () => {
    // Implement logic to delete the user
    console.log('User deleted!');
  };

  return (
    <AuthProvider>
    <Router>
      <div className={`App ${theme}`}>
        <MyNavbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/Group" element={<Group />} />
          <Route path='/User' element={<User/>} /> {/* This will allow Home to receive an ID */}
          <Route path="/Settings"/>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie/>} /> {/* This will allow Home to receive an ID */}
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;