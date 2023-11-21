const express = require('express');
const router = express.Router();

// Define movies-related routes
router.get('/', (req, res) => {
    const fetch = require('node-fetch');

    const url = 'https://api.themoviedb.org/3/search/movie?query=john&include_adult=false&language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDE0YTZjMzhjYTVjMmU1Zjc4OGRlNWZhM2QyMmRhMCIsInN1YiI6IjY1NGNkYjNlNWE1ZWQwMDExZTA1ZTZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VhyYRjGa7sNaAiQV3Tw5vHz674ZKTZG07m5-aL98PMA'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
});

router.post('/', (req, res) => {
  // Logic for handling POST /movies
});

// More movies-related routes...

module.exports = router;
