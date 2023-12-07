const express = require('express');
const router = express.Router();
const FinnkinoController = require('../controllers/FinnkinoController');

//Lista näytöksistä ja niiden kansikuva,nimi,tekstitykset ja kuva
router.get('/events', FinnkinoController.getEvents);
//Finnkinon ajankohtaista sivu
router.get('/news', FinnkinoController.getNews);




module.exports = router;