const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');

// Define TMDb routes
router.get('/movies/', tmdbController.getMovieDetailsfromid); // Endpoint for movie details

router.get('/search/movie',tmdbController.searchbykeyword);
// Add more routes for TMDb API endpoints

module.exports = router;
