// USED TO TEST TMDB API REQUESTS DELETE BEFORE FINAL COMPILE
/*
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

*/
const fetch = require('node-fetch');
const { apiKey } = require('./config'); // Assuming config.js is in the same directory

const baseUrl = 'https://api.themoviedb.org/3';
const movieId = 245891; // Replace with the specific movie ID you want to fetch

fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Movie Details:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response Body:', error.response.body);
      console.error('Response Headers:', error.response.headers);
    }
  });
