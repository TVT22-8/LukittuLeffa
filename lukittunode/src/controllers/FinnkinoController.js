const getFinnkinoEvents  = require ('../utils/Finnkinoeventlist');

const getEventsController = async (req, res) => {
  try {
    const events = await getFinnkinoEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Finnkino events' });
  }
};



module.exports = getEventsController;
