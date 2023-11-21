const express = require('express');
const app = express();

// Other middleware and configurations...

// Import route handlers
const moviesRoutes = require('./movies');
const productsRoutes = require('./products');

// Define routes
app.use('/movies', moviesRoutes);
app.use('/products', productsRoutes);

// Other app configurations...

module.exports = app;
