import React, { useState, useEffect } from 'react';
import { Card, Button, CardBody, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useUserId from './useUserId';

//this code fetches and posts all movie information on moviepage

const url = 'https://image.tmdb.org/t/p/original';
const url2 = 'https://image.tmdb.org/t/p/w200';


const Testfetch = () => {
  // Remove the movieId state declaration
  const [movieInfo, setMovieInfo] = useState(null);
  const [castInfo, setCastInfo] = useState(null);
  const [reviewInfo, setReviewInfo] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  const { id: movieId } = useParams(); // Use movieId from the URL parameters
  const userId = useUserId();
  const [selectedNumber, setSelectedNumber] = useState(1);

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedNumber(selectedValue);
  };


  const addWatchlist = async (id) => {

    if(userId == null){
      alert('Not logged in');
      return;
    }

    const ids = {
      'uId': userId[0].userid,
      'movieId': id
    }
    console.log('katotaanpa', ids);
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(ids),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Added to wathclist:', result);
        alert('Added to watchlist');
      } else {
        console.error('Failed to send watchlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const addHistory = async (id) => {

    if(userId == null){
      alert('Not logged in');
      return;
    }

    const ids = {
      'uId': userId[0].userid,
      'movieId': id
    }
    console.log('katotaanpa', ids);
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchhistory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(ids),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Added to history:', result);
        alert('Added to history');
      } else {
        console.error('Failed to send history:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  const addReview = async (id) => {

    if(userId == null){
      alert('Not logged in');
      return;
    }

    const ids = {
      'revText': reviewText,
      'rating': selectedNumber,
      'movieId': id,
      'uId': userId[0].userid
    }
    console.log('katotaanpa', ids);
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchreviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(ids),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Added review:', result);
        alert('Added review');
      } else {
        console.error('Failed to send review:', response.statusText);
        alert('Failed to sen review "have u watched the movie?"');
      }
    } catch (error) {
      console.error('Error adding to review:', error);
    }
  };


  useEffect(() => {
    // Define the fetching functions inside useEffect or move them outside if they don't need to access movieId directly from the closure
    const fetchMovieInfo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3002/tmdb/movie/${id}`);
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.error('Error fetching movie information:', error);
      }
      // ... use id argument instead of movieId state
    };

    const fetchCastInfo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3002/tmdb/movie/${id}/credits`);
        const data = await response.json();
        setCastInfo(data);
      } catch (error) {
        console.error('Error fetching cast information:', error);
      }
    };

    const fetchReviews = async (id) => {
      try {
        const response = await fetch(`http://localhost:3002/db/movies/watchreviews/${id}`);
        const data = await response.json();
        setReviewInfo(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Call the fetch functions with movieId from the URL params
    if (movieId) {
      fetchMovieInfo(movieId);
      fetchCastInfo(movieId);
      fetchReviews(movieId);
    }
  }, [movieId]); // Depend on movieId from useParams




  return (
    <div>
      <div style={{ position: 'absolute', top: '100px', display: 'flex', justifyContent: 'flex-start', margin: '0 100px' }}>
        {movieInfo && (
          <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={url + movieInfo.poster_path} />
            <Card.Body>
              <Card.Title>Title: {movieInfo.title}</Card.Title>
              <Card.Text>
                Release date: {movieInfo.release_date}
              </Card.Text>
              <Card.Text>
                Duration: {movieInfo.runtime} Minutes
              </Card.Text>
              <Button variant="primary" onClick={() => addWatchlist(movieId)} style={{ display: 'inline-flex', margin: '0 20px' }}>Add to watchlist</Button>
              <Button variant="primary" onClick={() => addHistory(movieId)} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>Add to history</Button>
            </Card.Body>
          </Card>
        )}
      </div>
      <div style={{ position: 'absolute', top: '100px', left: '500px', display: 'flex', justifyContent: 'flex-end', margin: '0 50px' }}>
        {movieInfo && (
          <Card style={{ width: '700px', height: '400px' }}>
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
                      <div>- {actor.character}</div>
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
              <Card.Title>Crew:</Card.Title>
              <Card.Text>
                {castInfo.directing.map((director, index) => (
                  <span key={director.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <br />}
                    <Card.Img style={{ height: "20%", width: "20%", marginRight: '10px' }} src={url2 + director.profile_path} />
                    <div>
                      <div>{director.name}</div>
                      <div>- {director.job}</div>
                    </div>
                  </span>
                ))}
                {castInfo.producing.map((producer, index) => (
                  <span key={producer.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <br />}
                    <Card.Img style={{ height: "20%", width: "20%", marginRight: '10px' }} src={url2 + producer.profile_path} />
                    <div>
                      <div>{producer.name}</div>
                      <div>- {producer.job}</div>
                    </div>
                  </span>
                ))}
                {castInfo.writing.map((writer, index) => (
                  <span key={writer.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <br />}
                    <Card.Img style={{ height: "20%", width: "20%", marginRight: '10px' }} src={url2 + writer.profile_path} />
                    <div>
                      <div>{writer.name}</div>
                      <div>- {writer.job}</div>
                    </div>
                  </span>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      <div style={{ position: 'absolute', top: '520px', left: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', margin: '0 50px' }}>
        {reviewInfo && (
          <Card style={{ width: '700px', height: '380px', overflowY: 'auto' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '3rem' }}>Reviews:</Card.Title>
              <label>
                Review text:
                <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
              </label>
              <Form>
                <Form.Group controlId="numberSelect">
                  <Form.Label>Rating:</Form.Label>
                  <Form.Control style={{width:'50px'}} as="select" value={selectedNumber} onChange={handleSelectChange}>
                    {[...Array(10)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button onClick={() => addReview(movieId)}>Add review</Button>
              <br />
              <br />
              <Card.Text style={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
                {reviewInfo.map((review, index) => (
                  <span key={index}>
                    {index > 0 && <br />}
                    <div>  "{review.reviewtext}" {review.username} - {review.reviewdate}</div>
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
