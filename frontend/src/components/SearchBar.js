import React, { useState } from 'react';
import './SearchBar.css';


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
                {/* Limit the displayed characters to 10 */}
                {result.title.length > 10
                  ? `${result.title.substring(0, 15)}...`
                  : result.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;