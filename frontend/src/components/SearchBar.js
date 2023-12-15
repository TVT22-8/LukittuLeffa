import React, { useState } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';



const SearchBar = ({ onSearch, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="row">
      <div className="col-md-4"> {/* Adjust the column size as needed */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {searchResults.length > 0 && (
        <div className="col-md-8"> {/* Adjust the column size as needed */}
          <ul className="list-group">
          {searchResults.map((result) => (
  <li key={result.id} className="list-group-item">
    <Link to={`/movie/${result.id}`}>
      {result.title.length > 55
        ? `${result.title.substring(0, 55)}...`
        : result.title}
    </Link>
  </li>
))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;