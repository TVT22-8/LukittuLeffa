const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');

//REDO NECESSARILY

const baseUrl = 'https://api.themoviedb.org/3';
// Define TMDb routes
router.get(`${baseUrl}/movie/`,tmdbController.getMovieDetailsfromid ); // Endpoint for movie details

router.get(`${baseUrl}/search/movie `,tmdbController.searchbykeyword);
// Add more routes for TMDb API endpoints

router.get(`${baseUrl}/movie/credits`, tmdbController.getcast);

router.get(`${baseUrl}/movie/recommendations`, tmdbController.getSimilarMovies);

module.exports = router;
