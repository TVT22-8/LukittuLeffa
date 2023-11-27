const express = require('express');
const app = express();
const userRoutes = require('./routes/dbRoutes');//Include every route created later on
const bodyParser = require('body-parser');

app.use(bodyParser.json());//For parsing JSON data


console.log('Main logic running');

module.exports = app;