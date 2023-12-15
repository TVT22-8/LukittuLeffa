import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css';
import SearchBar from './SearchBar';
import { Button } from './Button'; // Import the Button component
import { Bootstrap } from 'react-bootstrap-icons';

const MenuItems = [
  {
    title: 'Groups',
    path: '/Group',
    cName: 'nav-links',
  },
  {
    title: 'User',
    path: '/User',
    cName: 'nav-links',
  },
];

// Define the searchMovies function here
async function searchMovies(query) {
  try {
    const apiKey = '9014a6c38ca5c2e5f788de5fa3d22da0'; // Replace with your TMDb API key
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return []; // Returning an empty array in case of an error
  }
}

function MyNavbar() {
  const [click, setClick] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => setClick(!click);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      // Call your MovieSearch function with the query and fields
      const fieldsToRetrieve = ['title', 'overview', 'release_date', 'poster_path']; // Adjust as needed
      const results = await searchMovies(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setSearchResults([]); // Returning an empty array in case of an error
    }
  };

  useEffect(() => {
    // You can debounce the API calls here to prevent making too many requests
    const debounceTimeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300); // Adjust the debounce timeout as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);



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
  <NavDropdown.Item
    key={index}
    as={Link}
    to={item.path}
    onClick={() => setClick(false)}
    className={item.cName}
  >
    {item.title}
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
      <SearchBar onSearch={handleSearch} searchResults={searchResults} />
        <Button /> {/* Sign Up button */}
      </div>

      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
    </Navbar>
  );
}

export default MyNavbar;

