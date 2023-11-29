const express = require('express');
const router = express.Router();
const tmdbController = require('../controllers/tmdbController');

// Define TMDb routes
router.get('/movies/:movieid', tmdbController.getMovieDetails); // Endpoint for movie details

// Add more routes for TMDb API endpoints

module.exports = router;
