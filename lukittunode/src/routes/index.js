const express = require('express');
const router = express.Router();

const tmdbRoutes = require('./tmdbRoutes');
const dbRoutes = require('./dbRoutes');
const FinnkinoRoutes = require('./FinnkinoRoutes');
const authenticateUser = require('../utils/verifyLogin');


// Use TMDb routes
router.use('/tmdb', tmdbRoutes);

// Use database routes
router.use('/db', dbRoutes);

// Use Finnkino routes
router.use('/finnkino', FinnkinoRoutes);

// Login verification
router.post('/verifylogin', authenticateUser);



module.exports = router;
