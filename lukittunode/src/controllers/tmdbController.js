const { fetchfromid } = require('../utils/fetchfromid');

const tmdbController = {
  getMovieDetailsfromid: async (req, res) => {
    try {
      const { movieid } = req.params;
      const data = await fetchfromid(movieid, ['title', 'tagline', 'genres', 'release_date', 'overview', 'popularity', 'runtime']);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Other controller functions for TMDb API
};

module.exports = tmdbController;
