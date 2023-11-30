const express = require('express');
const app = express();

const routes = require('./routes'); // Import the aggregated router from index.js
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // For parsing JSON data

app.use('/', routes); // Use the aggregated router for all routes

console.log('Main logic running');
const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;

