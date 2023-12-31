import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, CardBody, CardText, Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OuterCard from './jsxfiles/OuterCard';
import useUserId from './jsxfiles/useUserId';
import { Badge } from 'react-bootstrap';
import RatingStars from './jsxfiles/Ratingstars';

const UserPage = () => {
  const url = 'https://image.tmdb.org/t/p/original';

  const [userWatch, setUserWatch] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [history, setHistory] = useState([]);
  const [movieHistory, setMovieHistory] = useState([]);
  const userId = useUserId();
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [sugMovie, setSugMovie] = useState('');




  useEffect(() => {
    fetchMovieInfo();
    fetchMovieHistory();
  }, [userWatch]);

  useEffect(() => {
    fetchUserWatchlist();
    fetchUserHistory();
    fetchUserName();
    fetchUserReviews();
    fetchSuggestedMovies();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      console.log('Effect to fetch groups and admin status running');
      fetchUserGroupsAndAdminStatus();
    }
  }, [userId]);


  const fetchUserWatchlist = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchlist/${userId[0].userid}`);
      const data = await response.json();
      console.log(data);
      setUserWatch(data);


    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };
  const fetchUserName = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/users/${userId[0].userid}`);
      const data = await response.json();
      console.log(data);
      // Assuming data is an array and you want the first object
      if (response.ok && data.length > 0) {
        setUserName(data[0].username); // Access the username property of the first object
      } else {
        // Handle the case where data is not as expected
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const fetchSuggestedMovies = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/users/similar/${userId[0].userid}`);
      const data = await response.json();
      console.log(data, 'suggested movies');
      setSugMovie(data);
    } catch (error) {
      console.error('Error fetching five reviews:', error);
    }
  };


  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchreviews/${userId[0].userid}`);
      const data = await response.json();
      console.log(data);
      if (response.ok && data.length > 0) {
        setReviews(data); // Set the entire reviews data
      } else {
        // Handle the case where there are no reviews
        setReviews([]); // Or keep it as is if you prefer to show nothing
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };


  const fetchUserGroupsAndAdminStatus = async () => {
    try {
      const userIdValue = userId[0].userid;

      // Fetch all groups the user is a part of
      const groupsResponse = await fetch(`http://localhost:3002/db/users/groups/${userIdValue}`);
      const groupsData = await groupsResponse.json();

      // Fetch all group memberships to find where the user is an admin
      const membershipsResponse = await fetch(`http://localhost:3002/db/groups/members/${userIdValue}`);
      const membershipsData = await membershipsResponse.json();

      // Log the memberships data to verify
      console.log('Memberships data:', membershipsData);

      // Combine group data with admin status
      const combinedGroups = groupsData.map(group => {
        const isAdmin = membershipsData.some(member => {
          // Convert both IDs to the same type before comparison
          return String(member.groupid) === String(group.groupid) && member.is_admin;
        });
        return { ...group, is_admin: isAdmin };
      });

      // Log the combined groups data to verify
      console.log('Setting user groups with admin status', combinedGroups);
      setUserGroups(combinedGroups);
    } catch (error) {
      console.error('Error fetching groups and admin status:', error);
    }
  };
  const fetchUserHistory = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/users/watchhistory/${userId[0].userid}`);
      const data = await response.json();
      console.log(data, 'history');
      setHistory(data);


    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  const fetchMovieHistory = async () => {

    try {
      const moviePromises = history.map(async (id) => {
        const response = await fetch(`http://localhost:3002/tmdb/movie/${id.movieid}`);
        const data = await response.json();
        console.log(data);
        return data;
      });
      const movieInfoArray = await Promise.all(moviePromises);

      setMovieHistory(movieInfoArray);
      console.log(movieHistory, 'history');

    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };

  const fetchMovieInfo = async () => {

    try {
      const moviePromises = userWatch.map(async (id) => {
        const response = await fetch(`http://localhost:3002/tmdb/movie/${id.movieid}`);
        const data = await response.json();
        console.log(data);
        return data;
      });
      const movieInfoArray = await Promise.all(moviePromises);

      setMovieInfo(movieInfoArray);
      console.log(movieInfo, 'watchlist');

    } catch (error) {
      console.error('Error fetching movie information:', error);
    }
  };

  return (

    <Container fluid="lg" className="my-4">
      {/* Username Display */}
      <Row className="mb-3">
        <Col>
          <h2>Welcome {userName ? userName : 'Loading...'}</h2> {/* Display the username or loading text */}
        </Col>
      </Row>
      {/* Suggestions Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Suggestions</Card.Header>
            {sugMovie && (
              <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
                {sugMovie.map((id, index) => (
                  <Card key={index} style={{ width: '200px', height: '290px' }}>
                    {index > 0 && <br />}
                    <CardBody>
                      <Link to={`http://localhost:3000/movie/${id.movieId}`}>
                        <Card.Img style={{ height: "100%", width: "100%" }} src={url + id.poster_path}></Card.Img>
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Watchlist Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Watchlist</Card.Header>
            <Card.Body>
              {movieHistory && movieHistory.length > 0 ? (
                <div style={{ display: 'inline-flex', flexDirection: 'row', overflowX: 'scroll' }}>
                  {movieInfo.map((movie, index) => (
                    <Card key={index} style={{ width: '200px', height: '290px', marginRight: '10px' }}>
                      <CardBody>
                        <Link to={`http://localhost:3000/movie/${movie.id}`}>
                          <Card.Img style={{ height: "100%", width: "100%" }} src={url + movie.poster_path} alt={movie.title} />
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No history available. Start watching to populate this list.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Watchlist Section */}
      <Row className="mb-3">
        <Col>
          <Card style={{ overflowX: 'auto' }}>
            <Card.Header>Watch History</Card.Header>
            <Card.Body>
              {movieHistory && movieHistory.length > 0 ? (
                <div style={{ display: 'inline-flex', flexDirection: 'row', overflowX: 'scroll' }}>
                  {movieHistory.map((movie, index) => (
                    <Card key={index} style={{ width: '200px', height: '290px', marginRight: '10px' }}>
                      <CardBody>
                        <Link to={`http://localhost:3000/movie/${movie.id}`}>
                          <Card.Img style={{ height: "100%", width: "100%" }} src={url + movie.poster_path} alt={movie.title} />
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No history available. Start watching to populate this list.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Reviews Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>User Reviews</Card.Header>
            <Card.Body>
              {reviews && reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                  {reviews.map((review, index) => (
                    <Card key={index} style={{ width: '380px', height: '290px', marginRight: index < reviews.length - 1 ? '10px' : '0' }}>
                      <CardBody>
                        <Link to={`http://localhost:3000/movie/${review.watchhistory_movieid}`}>
                          <Card.Title style={{ textAlign: 'center' }}>{review.title}</Card.Title>
                        </Link>
                        <br></br>
                        <Card.Text>{review.reviewtext}</Card.Text>
                        <Card.Text style={{ fontSize: '12px', textAlign: 'end' }}>
                          Reviewed on: {(review.reviewdate)}
                        </Card.Text>
                        <RatingStars rating={review.rating} />
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>No reviews found. Add some reviews to see them here.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* User's Groups Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Your Groups</Card.Header>
            <Card.Body>
              {userGroups.length > 0 ? (
                userGroups.map((group) => (
                  <Link to={`/group/${group.groupid}`} key={group.groupid} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card
                      style={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: group.is_admin ? '#eff6ff' : '#fff',
                      }}
                    >
                      <CardBody>
                        <Card.Title>
                          {group.groupname}
                          {group.is_admin && (
                            <Badge pill variant="primary" style={{ marginLeft: '10px' }}>
                              Admin
                            </Badge>
                          )}
                        </Card.Title>
                        <Card.Text>{group.description}</Card.Text>
                      </CardBody>
                    </Card>
                  </Link>
                ))
              ) : (
                <p>You are not a member of any groups.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default UserPage;

