const fetch = require('node-fetch');
const { bearerToken, apiKey } = require('../../config');


const makeAPICall = async (bearerToken) => {
  const url = `https://api.themoviedb.org/3/authentication`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

module.exports = makeAPICall;

makeAPICall(bearerToken);