const express = require('express');
const app = express();

const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getMovieDetailsfromid } = require('./controllers/tmdbController');
const fetchfromid = require('./utils/fetchfromid');


app.use(bodyParser.json()); // For parsing JSON data

app.use(cors()); // Enable CORS for all routes

app.use('/', routes); // Use the aggregated router for all routes

console.log('Main logic running');
const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Miikan hiekkis
// Simulate a request and response objects (replace with actual objects in your application)
const req = {
  params: {
    movieId: '553287', // Replace with the actual movieId
  },
};

const res = {
  json: data => console.log(data), // Replace with your actual response handling logic
  status: code => console.log(`Status Code: ${code}`), // Replace with your actual response handling logic
};

// Use the function
getMovieDetailsfromid(req, res);



module.exports = app;
