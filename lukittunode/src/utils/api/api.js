const fetch = require('node-fetch');

const makeAPICall = async (baseUrl, endpoint, token) => {
  const url = `${baseUrl}/${endpoint}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

module.exports = makeAPICall;
