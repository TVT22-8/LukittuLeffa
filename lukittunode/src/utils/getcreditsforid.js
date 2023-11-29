const fetch = require('node-fetch');
const { apiKey } = require('../config');
const baseUrl = 'https://api.themoviedb.org/3';

function getCredits(movieId) {
  const fetchUrl = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;

  return fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
     
      const { cast } = data; // Extract 'cast' from received data
      return cast;
    })
    .catch((error) => {
      console.error('Error fetching credits:', error);
      throw error; // Re-throwing the error for further handling, if needed
    });
}

module.exports = getCredits;
