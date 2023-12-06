// combines ALL routes in ./routes/ folder for easier access.
const express = require('express');
const router = express.Router();

const tmdbRoutes = require('./tmdbRoutes');
const dbRoutes = require('./dbRoutes');
const FinnkinoRoutes = require('./FinnkinoRoutes');

// Use TMDb routes
router.use('/tmdb', tmdbRoutes);

// Use database routes
router.use('/db', dbRoutes);

// Use Finnkino routes
router.use('/finnkino', FinnkinoRoutes);

module.exports = router;
