const fetchfromid = require('../utils/fetchfromid')
const  MovieSearch  = require('../utils/keywordsearch')

const tmdbController = {
  getMovieDetailsfromid: async (req, res) => {
    try {
      console.log('getMovieDetailsfromid called');
      const movieId = req.params.movieId;
      console.log('movieId:', movieId); // Check if movieId is retrieved correctly
      const data = await fetchfromid(movieId, ['title', 'tagline', 'genres', 'release_date', 'overview', 'popularity', 'runtime', 'poster_path']);
      res.json(data);
    } catch (error) {
       console.error('Error in getMovieDetailsfromid:', error);
       res.status(500).json({ error: error.message });
    }
  },
  searchbykeyword: async (req, res) => {
    try {
      console.log('searchbykeyword called');
      const { qword } = req.query;
      console.log('qword:', qword); // Check if qword is retrieved correctly
      const data = await MovieSearch(qword, ['title', 'poster_path', 'release_date', 'id']);
      res.json(data);
    } catch (error) {
      console.error('Error in searchbykeyword:', error);
      res.status(500).json({ error: error.message });
    }
  },
  
};

module.exports = tmdbController;
