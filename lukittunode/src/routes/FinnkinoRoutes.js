const express = require('express');
const router = express.Router();
const FinnkinoController = require('../controllers/FinnkinoController');


router.get('/events', FinnkinoController.getEvents);




module.exports = router;