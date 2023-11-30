const express = require('express');
const app = express();
const dbRoutes = require('./routes/dbRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()); // For parsing JSON data

app.use(cors()); // Enable CORS for all routes

app.use('/db', dbRoutes);

// Your other route configurations
app.get('/db/users', (req, res) => {
  // Handle the request and send data
  res.json({ message: 'Hello from the backend!' });
});

const port = 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
