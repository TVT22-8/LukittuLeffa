const fetchfromid = require('../utils/fetchfromid')
const  MovieSearch  = require('../utils/keywordsearch')
const getCredits = require ('../utils/getcreditsforid')
const getSimilar = require ('../utils/getsimilarmovies')

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
  getcast: async (req, res) => {
    try {
      console.log('getcast called');
      const { movieId } = req.params;
      console.log('movieId:', movieId); 
      const data = await getCredits(movieId);
      res.json(data);
    } catch (error) {
      console.error('Error in getcast:', error);
      res.status(500).json({ error: error.message });
    }
  },
  getSimilarMovies: async (req, res) => {
    try {
      console.log('get similar called');
      const { movieId } = req.params;
      console.log('movieId:', movieId); 
      const data = await getSimilar(movieId);
      res.json(data);
    } catch (error) {
      console.error('Error in getsimilar:', error);
      res.status(500).json({ error: error.message });
    } 
  }
};

module.exports = tmdbController;
