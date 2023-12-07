import React, { useState } from 'react';
import { Card, Button, CardBody } from 'react-bootstrap';

const url = 'https://image.tmdb.org/t/p/original';

const Testfetch = () => {
  const [movieId, setMovieId] = useState('');
  const [movieInfo, setMovieInfo] = useState('');

  const fetchMovieInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3002/tmdb/movie/${movieId}`);
      const data = await response.json();
      console.log(data);
      setMovieInfo(data); // Corrected: setMovieInfo instead of setMovieId
    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };

  return (
    <div>
      <label>
        Enter Movie ID:
        <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} />
      </label>
      <button onClick={fetchMovieInfo}>Fetch Movie Information</button>
    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '0 200px' }}>
      {movieInfo && (
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src={url + movieInfo.poster_path} /> {/* Corrected: Card.Img */}
          <Card.Body>
            <Card.Title>Title: {movieInfo.title}</Card.Title>
            <Card.Text>
              Release date: {movieInfo.release_date}
              </Card.Text>
              <Card.Text>
              Duration: {movieInfo.runtime} Minutes
              </Card.Text>
            <Button variant="primary">Add to ...</Button>
          </Card.Body>
        </Card>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '0 50px' }}>
      {movieInfo && (
        <Card style={{ width: '700px', height: '300px' }}>
          <Card.Body>
          <Card.Title>Title: {movieInfo.title}</Card.Title>
            <Card.Text>
              Description: {movieInfo.overview}
              </Card.Text>
          </Card.Body>
        </Card>
      )}
      </div>
      </div>
    </div>
  );
};

export default Testfetch;
