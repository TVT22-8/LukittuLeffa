// Navbar.js
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
const Navbar = () => {
  //const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav>
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
    </nav>
  );
};

export default Navbar;