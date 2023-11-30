const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()); // For parsing JSON data

app.use(cors()); // Enable CORS for all routes

// Your other route configurations Miikan hiekkis
app.get('/db/users', (req, res) => {
  // Handle the request and send data
  res.json({ message: 'Hello from the backend!' });
});

app.use('/', routes); // Use the aggregated router for all routes

console.log('Main logic running');
const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;
