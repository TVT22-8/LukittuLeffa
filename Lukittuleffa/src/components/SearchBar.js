import React from 'react'
import {FaSearch} from 'react-icons/fa'

export const SearchBar = () => {
  return <div className='input-wrapped'>
    <FaSearch id='search-icon' />
    <input placeholder='Search for a movie' />
  </div>
};
