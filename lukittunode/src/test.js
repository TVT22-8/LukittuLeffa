const { makeAPICall } = require('./utils/api');

const baseUrl = 'https://api.themoviedb.org/3';
const endpoint = 'authentication';
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDE0YTZjMzhjYTVjMmU1Zjc4OGRlNWZhM2QyMmRhMCIsInN1YiI6IjY1NGNkYjNlNWE1ZWQwMDExZTA1ZTZkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VhyYRjGa7sNaAiQV3Tw5vHz674ZKTZG07m5-aL98PMA'; // Replace with your actual bearer token

// Make an API request using the bearer token
makeAPICall(baseUrl,endpoint, bearerToken)
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
