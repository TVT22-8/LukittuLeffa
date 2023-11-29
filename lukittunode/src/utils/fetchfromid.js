//Extracts relevant data from API still needs to be made so i can call for certain items only


const fetch = require('node-fetch');
const { apiKey } = require('../config'); // Assuming config.js is in the same directory
 
const baseUrl = 'https://api.themoviedb.org/3';
const movieId = 245891; // Replace with the specific movie ID you want to fetch

function fetchfromid  (movieId, fields)  {
  const fetchUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;

  return fetch(fetchUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!fields || fields.length === 0) {
        console.log('Movie Details:', data);
      } else {
        fields.forEach(field => {
          if (data[field]) {
            console.log(`${field}: ${data[field]}`);
          } else {
            console.log(`${field}: Not found`);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response Body:', error.response.body);
        console.error('Response Headers:', error.response.headers);
      }
    });
};

module.exports = fetchfromid;
// below can be altered to get data you want current example gives everything.
fetchfromid(movieId, ['title', 'tagline', 'genres', 'release_date', 'overview', 'popularity', 'runtime']);
// genres show as objects because they are given as genre ids in API, needs func etc.