import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import { Button } from './Button'; // Import the Button component

// ... (existing imports)

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
            Services <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <Dropdown />}
        </div>

        <div className='navbar-center'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Lukittuleffa
            <i className='fab fa-firstdraft' />
          </Link>
        </div>

        <div className='navbar-right'>
          <SearchBar />
          <Button /> {/* Sign Up button */}
        </div>

        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;