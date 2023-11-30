//to start the server: node server OR nodemon server
const main = require('../main');
const express = require('express');
const cors = require('cors');

const app = main;

app.use(cors());

// Your other route configurations
app.get('/db/users', (req, res) => {
  // Handle the request and send data
  res.json({ message: 'Hello from the backend!' });
});

const port = 3002;

//app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});