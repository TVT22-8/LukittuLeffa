// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for light and dark modes

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add additional logic to store the user's preference, e.g., in local storage
  };

  return (
    <nav className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Link to="/"> <h1>Lukittuleffa</h1> </Link>
      <ul>
        <li>
          <Link to="/my_groups"> My groups </Link>
        </li>
        <li>
          <Link to="/settings">settings </Link>
        </li>
        <li>
          <Link to="/groups"> groups</Link>
        </li>
      </ul>
      <SearchBar />
      <div className="mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </div>
    </nav>
  );
};

export default Navbar;