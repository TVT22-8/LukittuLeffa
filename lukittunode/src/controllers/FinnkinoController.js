const e = require('express');
const getFinnkinoEvents  = require ('../utils/Finnkinoeventlist');
const getFinnkinoNews = require('../utils/FinnkinoNews');

const FinnkinoController = {
    getEvents: async (req, res) => {
      try {
        const events = await getFinnkinoEvents();
        res.json(events);
      } catch (error) {
        console.error('Error in getEvents:', error);
        res.status(500).json({ error: 'Error fetching Finnkino events' });
      }
    },
    getNews: async (req, res) => {
        try {
            const news = await getFinnkinoNews();
            res.json(news);
        } catch (error){
            console.error('Error in getFinnkinoNews:', error);
            res.status(500).json({ error: 'Error fetching Finnkino news'});
        }
    },

};


module.exports = FinnkinoController;
