import React, { useState, useEffect } from 'react';
import { Card, Button, CardBody, CardText, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
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
    const userId = useUserId();

    

    useEffect(() => {
        fetchFiveReviews();
        fetchfinnkino();
        fetchUserWatchlist();
        fetchUserHistory();
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

    const fetchfinnkino = async () => {
        try {
            const response = await fetch(`http://localhost:3002/finnkino/events`);
            const data = await response.json();
            console.log(data);
            setFinn(data);
        } catch (error) {
            console.error('Error fetching finnkino:', error);
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

    <div style={{position: 'absolute', left: '60px'}}>
    <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Five Latest Reviews</Card.Title>
      <OuterCard>
      {fiveReviews && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {fiveReviews.map((show, index) => (
            <Card key={index} style={{width: '353px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <CardText>{show.reviewtext}
                <CardText style={{fontSize: '12px'}}>{show.reviewdate}
                </CardText>Name: {show.reviewer_username}</CardText>
                
                <RatingStars rating={show.rating} />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div> 

    <div style={{position: 'absolute', left: '60px', top: '500px'}}>
    <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Finnkino</Card.Title>
      <OuterCard>
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

      <div style={{position: 'absolute', left: '60px', top: '880px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>Watchlist</Card.Title>
      <OuterCard>
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

      <div style={{position: 'absolute', left: '60px', top: '1210px'}}>
      <Card.Title style={{textAlign: 'center', fontSize: '40px'}}>History</Card.Title>
      <OuterCard>
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

    </div>
    );
};

export default Homefetch;