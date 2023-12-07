import React, { useState } from 'react';
import { Card, Button, CardBody } from 'react-bootstrap';

const url = 'https://image.tmdb.org/t/p/original';
const url2 = 'https://image.tmdb.org/t/p/w200';

const Testfetch = () => {
  const [movieId, setMovieId] = useState('');
  const [movieInfo, setMovieInfo] = useState('');
  const [castInfo, setCastInfo] = useState('');

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
  const fetchCastInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3002/tmdb/movie/${movieId}/credits`);
      const data = await response.json();
      console.log(data);
      setCastInfo(data); // Corrected: setMovieInfo instead of setMovieId
    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };

  const click = () => {
    fetchCastInfo();
    fetchMovieInfo();
  };

  return (
    <div>
      <label>
        Enter Movie ID:
        <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} />
      </label>
      <button onClick={click}>Fetch Movie Information</button>

      <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '0 100px' }}>
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
      </div>
      <div style={{ position: 'absolute', top: '100px', left: '500px', display: 'flex', justifyContent: 'flex-end', margin: '0 50px' }}>
        {movieInfo && (
          <Card style={{ width: '700px', height: '300px' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '3rem' }}>{movieInfo.title}</Card.Title>
              <Card.Text style={{ fontSize: '1.1rem' }}>
                <strong>Description:</strong> {movieInfo.overview}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      <div style={{ position: 'absolute', top: '100px', right: '350px', display: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', margin: '0 0px' }}>
        {castInfo && (
          <Card style={{ maxHeight: '800px', width: "300px", overflowY: 'auto' }}>
            <Card.Body>
              <Card.Title>Cast:</Card.Title>
              <Card.Text>
                {castInfo.cast.map((actor, index) => (
                  <span key={actor.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <br />}
                    <Card.Img style={{ height: "20%", width: "20%", marginRight: '10px' }} src={url2 + actor.profile_path} />
                    <div>
                      <div>{actor.name}</div>
                      <div>{actor.character}</div>
                    </div>
                  </span>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      <div style={{ position: 'absolute', top: '100px', right: '20px', display: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', margin: '0 0px' }}>
        {castInfo && (
          <Card style={{ maxHeight: '800px', width: "300px", overflowY: 'auto' }}>
            <Card.Body>
              <Card.Title>Workers:</Card.Title>
              <Card.Text>
                {castInfo.directing.map((actor, index) => (
                  <span key={actor.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <br />}
                    <Card.Img style={{ height: "20%", width: "20%", marginRight: '10px' }} src={url2 + actor.profile_path} />
                    <div>
                      <div>{actor.name}</div>
                      <div>{actor.character}</div>
                    </div>
                  </span>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>


    </div>
  );
};

export default Testfetch;
