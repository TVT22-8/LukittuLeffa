const express = require('express');
const app = express();
const dbRoutes = require('./routes/dbRoutes');//Include every route created later on
const bodyParser = require('body-parser');

app.use(bodyParser.json());//For parsing JSON data

app.use('/db', dbRoutes);


console.log('Main logic running');

module.exports = app;