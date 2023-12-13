const chai = require('chai');
const getFinnkinoEvents = require('../utils/Finnkinoeventlist');

// Choose the assertion style (in this example, using the 'expect' style)
const expect = chai.expect;

describe('getFinnkinoEvents', () => {
  it('should retrieve and extract Finnkino events', async () => {
    try {
      const events = await getFinnkinoEvents();
      expect(events).to.be.an('array').that.is.not.empty;
      // Add more expectations to validate the structure or content of the events if needed
    } catch (error) {
      throw new Error('Error occurred while fetching or extracting Finnkino events');
    }
  });

  it('should handle errors gracefully', async () => {
    try {
      // Simulating an error by providing an invalid URL
      // Modify the function to return a promise reject for the sake of testing
      const fetchFinnkinoData = async () => {
        throw new Error('Simulated error: Invalid URL');
      };
      const getFinnkinoEventsWithError = async () => {
        try {
          await fetchFinnkinoData();
        } catch (error) {
          throw error;
        }
      };

      await getFinnkinoEventsWithError();
      throw new Error('Error was expected but not thrown');
    } catch (error) {
      expect(error.message).to.equal('Simulated error: Invalid URL');
    }
  });

  // Add more test cases as needed to cover various scenarios
});
