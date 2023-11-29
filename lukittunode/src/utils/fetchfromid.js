const fetch = require('node-fetch');
const { apiKey } = require('../config');

const baseUrl = 'https://api.themoviedb.org/3';

async function fetchfromid(movieId, fields) {
  const fetchUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!fields || fields.length === 0) {
      return data; // Return the full movie details if no specific fields are requested
    } else {
      const filteredData = {};
      fields.forEach(field => {
        if (data[field]) {
          filteredData[field] = data[field];
        } else {
          filteredData[field] = 'Not found';
        }
      });
      return filteredData; // Return only the requested fields
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

module.exports = fetchfromid;
