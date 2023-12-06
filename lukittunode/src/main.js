const express = require('express');
const app = express();

const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getMovieDetailsfromid, getcast } = require('./controllers/tmdbController');
const fetchfromid = require('./utils/fetchfromid');



app.use(bodyParser.json()); // For parsing JSON data

app.use(cors()); // Enable CORS for all routes

app.use('/', routes); // Use the aggregated router for all routes

console.log('Main logic running');
const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



module.exports = app;
