import React, { useState } from 'react';
const url = 'https://image.tmdb.org/t/p/original'

const Testfetch = () => {
  const [movieId, setMovieId] = useState(''); // State to store the entered movieId
  const [castId, setCastId] = useState('');

  const fetchMovieInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3002/tmdb/movie/${movieId}`);
      const data = await response.json();
      console.log(data); // Handle the data as needed
      setMovieId(data);
      
    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };
  const fetchCastInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3002/tmdb/movie/${movieId}/credits`);
      const data = await response.json();
      console.log(data); // Handle the data as needed
      setCastId(data);
      
    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };

  return (
    <div>
      <label>
        Enter Movie ID:
        <input type="text" value={movieId} onChange={(e) =>setCastId(e.target.value) + setMovieId(e.target.value)} />
      </label>
      <button onClick={fetchMovieInfo}>Fetch Movie Information</button>
      <p>Title: {movieId.title}</p>
      <p>Realease date: {movieId.release_date}</p>
      <p>Duration: {movieId.runtime} Minutes</p>
      <p>Description: {movieId.overview}</p>
      <img src={url + movieId.poster_path}></img>
    </div>
  );
};

export default Testfetch;
