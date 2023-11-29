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
          <Link to="/Home"> emt </Link>
        </li>
        <li>
          <Link to="/Movie">movie </Link>
        </li>
        <li>
          <Link to="/Group"> groups</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;