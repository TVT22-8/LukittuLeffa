const express = require('express');
const router = express.Router();
const FinnkinoController = require('../controllers/FinnkinoController');


router.get('/events', FinnkinoController);




module.exports = router;