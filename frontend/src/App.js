// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Movie from './components/pages/Movie';
import Group from './components/pages/Group';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';

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
    <Router>
      <div className={`App ${theme}`}>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/Group" element={<Group />} />
          <Route path="/Settings"
          
            element={<Settings changeTheme={changeTheme} deleteUser={deleteUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;