//to start the server: node server OR nodemon server
const main = require('./main');
const express = require('express');

const app = main;

const port = 3002;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});