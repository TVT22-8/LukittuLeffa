import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import SearchBar from './SearchBar';
import { Button } from './Button'; // Import the Button component

const MenuItems = [
  {
    title: 'Settings',
    path: '/settings',
    cName: 'nav-links',
  },
  {
    title: 'Groups',
    path: '/Group',
    cName: 'nav-links',
  },
  {
    title: 'More Services',
    path: '/more-services',
    cName: 'nav-links',
  },
];

function MyNavbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Nav className='nav-item'>
        <NavDropdown
          title="Services"
          id="basic-nav-dropdown"
          show={click}
          onClick={handleClick}
          className="custom-dropdown" // Add a custom class for styling
        >
          {MenuItems.map((item, index) => (
            <NavDropdown.Item key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>

      <div className='navbar-center'>
        <Link to='/' className='navbar-logo'>
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
    </Navbar>
  );
}

export default MyNavbar;

