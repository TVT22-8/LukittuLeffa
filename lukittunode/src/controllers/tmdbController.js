const { makeAPICall } = require('../utils/api');
const { bearerToken } = require('../config'); // Import configuration

const baseUrl = 'https://api.themoviedb.org/3';

const tmdbController = {
    getMovieDetails: async (req, res) => {
      try {
        const { movieid } = req.params;
        const endpoint = `movie/${movieid}`; // Use movieid in the endpoint
  
        const response = await makeAPICall(baseUrl, endpoint, bearerToken);
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    // Other controller functions for TMDb API
  };
module.exports = tmdbController;
