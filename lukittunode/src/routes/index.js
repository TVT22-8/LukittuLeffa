// combines ALL routes in ./routes/ folder for easier access.
const express = require('express');
const router = express.Router();

const tmdbRoutes = require('./tmdbRoutes');
const dbRoutes = require('./dbRoutes');

// Use TMDb routes
router.use('/tmdb', tmdbRoutes);

// Use database routes
router.use('/db', dbRoutes);

module.exports = router;
