const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');

// Define TMDb routes
router.get('/movie/:movieId', tmdbController.getMovieDetailsfromid); // Endpoint for movie details

router.get('/search/movie', tmdbController.searchbykeyword);

router.get('/movie/:movieId/credits', tmdbController.getcast);

router.get('/movie/:movieId/recommendations', tmdbController.getSimilarMovies);

module.exports = router;
