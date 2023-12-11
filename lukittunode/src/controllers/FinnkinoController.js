const e = require('express');
const getFinnkinoEvents  = require ('../utils/Finnkinoeventlist');
const getFinnkinoNews = require('../utils/FinnkinoNews');
const getFinnkinoSchedule = require('../utils/FinnkinoSchedule');

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
    getSchedule: async(req, res) => {
      const areaID = req.params.areaID;
      try{
        const schedule = await getFinnkinoSchedule(areaID);
        res.json(schedule);
      }catch (error){
        console.error('Error in getFinnkinoSchedule:', error);
        res.status(500).json({ error: 'Error fetching Finnkino Schedule'});
    }
    }
    
};


module.exports = FinnkinoController;
