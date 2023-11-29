const fetch = require('node-fetch');
const { apiKey } = require('../config');
const baseUrl = 'https://api.themoviedb.org/3';

function MovieSearch  (qword, fields)  {
  const fetchUrl = `${baseUrl}/search/movie?query=${qword}&api_key=${apiKey}`;

  return fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const filteredData = data.results.map((movie) => {
        const filteredMovie = {};
        fields.forEach((field) => {
          if (movie[field]) {
            filteredMovie[field] = movie[field];
          }
        });
        return filteredMovie;
      });
      return filteredData; // Returning the filtered data for further processing if needed
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return []; // Returning an empty array in case of an error
    });
};

module.exports = MovieSearch;
