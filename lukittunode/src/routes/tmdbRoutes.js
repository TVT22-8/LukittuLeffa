const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');

// Search movie details by movieId
router.get('/movie/:movieId', tmdbController.getMovieDetailsfromid); 
// Search movies by name
router.get('/search/movie', tmdbController.searchbykeyword);
// Search credits(cast, director, producer & writer) by movieId 
router.get('/movie/:movieId/credits', tmdbController.getcast);
// Search for similar movies by movieId
router.get('/movie/:movieId/recommendations', tmdbController.getSimilarMovies);

module.exports = router;
