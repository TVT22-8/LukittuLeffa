import React, { useState, useEffect } from 'react';
import { Card, Button, CardBody, CardText, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OuterCard from './OuterCard';
import useUserId from './useUserId';
import RatingStars from './Ratingstars';

const Homefetch = () => {
    const url = 'https://image.tmdb.org/t/p/original';

    const [userWatch, setUserWatch] = useState('');
    const [movieInfo, setMovieInfo] = useState('');
    const [history, setHistory] = useState('');
    const [movieHistory, setMovieHistory] = useState('');
    const [fiveReviews, setFiveReviews] = useState('');
    const [userGroups, setUserGroups] = useState('');
    const [userReview, setUserReview] = useState('');
    const [groupReview, setGroupReview] = useState('');
    const [sugMovie, setSugMovie] = useState('');
    const userId = useUserId();

    
    useEffect(() => {
        fetchFiveReviews();
        fetchfinnkino();
      }, []); 

    useEffect(() => {
        fetchUserWatchlist();
        fetchGroupReviews();
        fetchUserReviews();
        fetchUserHistory();
        fetchUserGroups();
        fetchSuggestedMovies();
      }, [userId]); 

    useEffect(() => {
        fetchMovieInfo();
    },[userWatch]);

    useEffect(() => {
        fetchMovieHistory();
    },[history]);

    const [finn, setFinn] = useState('');

    const fetchFiveReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3002/db/watchreviews`);
            const data = await response.json();
            console.log(data, 'five reviews');
            setFiveReviews(data);
        } catch (error) {
            console.error('Error fetching five reviews:', error);
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
            console.log(data, 'user reviews');
            setUserReview(data);
        } catch (error) {
            console.error('Error fetching user reviews:', error);
        }
    };

    const fetchGroupReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3002/db/users/group/reviews/${userId[0].userid}`);
            const data = await response.json();
            console.log(data, 'group reviews');
            setGroupReview(data);
        } catch (error) {
            console.error('Error fetching grou reviews:', error);
        }
    };

    const fetchfinnkino = async () => {
        try {
            const response = await fetch(`http://localhost:3002/finnkino/events`);
            const data = await response.json();
            console.log(data, 'finnkino');
            setFinn(data);
        } catch (error) {
            console.error('Error fetching finnkino:', error);
        }
    };

    const fetchUserGroups = async () => {
        try {
          const response = await fetch(`http://localhost:3002/db/users/groups/${userId[0].userid}`);
          const data = await response.json();
          console.log(data, 'usergroups');
          setUserGroups(data);
          
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      };

    const fetchUserWatchlist = async () => {
        try {
          const response = await fetch(`http://localhost:3002/db/users/watchlist/${userId[0].userid}`);
          const data = await response.json();
          console.log(data, 'userwatchlist');
          setUserWatch(data);
          
          
        } catch (error) {
          console.error('Error fetching watchlist:', error);
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
          const moviePromises = history.map(async(id) => {
          const response = await fetch(`http://localhost:3002/tmdb/movie/${id.movieid}`);
          const data = await response.json();
          //console.log(data, 'finnkino');
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
          const moviePromises = userWatch.map(async(id) => {
          const response = await fetch(`http://localhost:3002/tmdb/movie/${id.movieid}`);
          const data = await response.json();
          //console.log(data, 'movieinfo');
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
    <div>
        <Card.Title style={{textAlign:'center', fontSize:'60px', backgroundColor:'grey'}}>Home Page</Card.Title>
        <br />

    <div style={{position: 'absolute', left: '60px', minWidth: '1800px', maxWidth: '1800px'}}>
    <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Five Latest Reviews</Card.Title>
      <OuterCard style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      {fiveReviews && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {fiveReviews.map((show, index) => (
            <Card key={index} style={{width: '353px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${show.watchhistory_movieid}`}>
                <Card.Title style={{textAlign: 'center'}}>{show.title}</Card.Title>
                </Link>
                <br></br>
                <CardText>{show.reviewtext}
                <CardText style={{fontSize: '12px', textAlign: 'end'}}>{show.reviewdate}
                </CardText></CardText>
                <CardText style={{fontSize: '18px', textAlign: 'end', fontWeight: 'bold'}}>-{show.reviewer_username}</CardText>
                
                <RatingStars rating={show.rating} />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div> 

    <div style={{position: 'absolute', left: '60px', top: '550px', minWidth: '1800px', maxWidth: '1800px'}}>
    <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Finnkino</Card.Title>
      <OuterCard style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      {finn && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {finn.map((show, index) => (
            <Card key={index} style={{width: '200px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={show.EventURL}>
                <Card.Img style={{height: "100%", width: "100%"}} src={show.EventLargeImagePortrait}></Card.Img>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div> 

      <div style={{position: 'absolute', left: '60px', top: '930px', minWidth: '1800px', maxWidth: '1800px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Watchlist</Card.Title>
      <OuterCard style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      {movieInfo && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {movieInfo.map((id, index) => (
            <Card key={index} style={{width: '200px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${id.id}`}>
                <Card.Img style={{height: "100%", width: "100%"}} src={url + id.poster_path}></Card.Img>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div>

      <div style={{position: 'absolute', left: '60px', top: '1310px', minWidth: '1800px', maxWidth: '1800px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>History</Card.Title>
      <OuterCard style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      {movieHistory && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {movieHistory.map((id, index) => (
            <Card key={index} style={{width: '200px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${id.id}`}>
                <Card.Img style={{height: "100%", width: "100%"}} src={url + id.poster_path}></Card.Img>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div>

      <div style={{position: 'absolute', left: '60px', top: '1690px', minWidth: '1800px', maxWidth: '1800px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Suggested Movies</Card.Title>
      <OuterCard style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      {sugMovie && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {sugMovie.map((id, index) => (
            <Card key={index} style={{width: '200px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${id.movieId}`}>
                <Card.Img style={{height: "100%", width: "100%"}} src={url + id.poster_path}></Card.Img>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div>

      <div style={{position: 'absolute', left: '60px', top: '2070px', minWidth: '1800px', maxWidth: '1800px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Your Groups</Card.Title>
      <OuterCard style={{ minWidth: '1800px', height: '325px', overflowX: 'auto'}}>
      {userGroups && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {userGroups.map((id, index) => (
            <Link to={`/group/${id.groupid}`} key={id.groupid} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card key={index} style={{width: '500px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Card.Title>{id.groupname}</Card.Title>
                <br />
                <CardText>{id.description}</CardText>
              </CardBody>
              
            </Card>
            </Link>
          ))}
        </div>
      )}
      </OuterCard>
    </div>

      <div style={{position: 'absolute', left: '60px', top: '2450px', minWidth: '880px', maxWidth: '880px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Your Latest Review</Card.Title>
      <OuterCard style={{ height: '325px', overflowX: 'auto'}}>
      {userReview && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {userReview.map((id, index) => (
            
            <Card key={index} style={{width: '420px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${id.watchhistory_movieid}`}>
                <Card.Title style={{textAlign: 'center'}}>{id.title}</Card.Title>
                </Link>
                <br></br>
                <CardText>{id.reviewtext}
                <CardText style={{fontSize: '12px', textAlign: 'end'}}>{id.reviewdate}
                </CardText></CardText>
                
                <RatingStars rating={id.rating} />
              </CardBody>
              
            </Card>
            
          ))}
        </div>
      )}
      </OuterCard>
      </div>

      <div style={{position: 'absolute', right: '60px', top: '2450px', minWidth: '880px', maxWidth: '880px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Groups Review</Card.Title>
      <OuterCard style={{ height: '325px', overflowX: 'auto'}}>
      {groupReview && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {groupReview.map((id, index) => (
            
            <Card key={index} style={{width: '420px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Link to={`http://localhost:3000/movie/${id.watchhistory_movieid}`}>
                <Card.Title style={{textAlign: 'center'}}>{id.title}</Card.Title>
                </Link>
                <CardText>{id.groupname}</CardText>
                <br></br>
                <CardText>{id.reviewtext}
                <CardText style={{fontSize: '12px', textAlign: 'end'}}>{id.reviewdate}
                </CardText></CardText>
                
                <RatingStars rating={id.rating} />
              </CardBody>
              
            </Card>
            
          ))}
        </div>
      )}
      </OuterCard>
      </div>

    </div>
    );
};

export default Homefetch;