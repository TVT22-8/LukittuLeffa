const getFinnkinoEvents  = require ('../utils/Finnkinoeventlist');

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
};


module.exports = FinnkinoController;
