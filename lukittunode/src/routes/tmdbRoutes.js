const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');



const baseUrl = 'https://api.themoviedb.org/3';
// Define TMDb routes
router.get(`${baseUrl}/movie/`); // Endpoint for movie details

router.get('/search/movie',tmdbController.searchbykeyword);
// Add more routes for TMDb API endpoints

module.exports = router;
