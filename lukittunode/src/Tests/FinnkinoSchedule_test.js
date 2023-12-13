const { expect } = require('chai');
const getFinnkinoSchedule = require('../utils/FinnkinoSchedule'); // Assuming this is the name of the file exporting your function

describe('getFinnkinoSchedule', () => {
  it('should fetch and parse Finnkino schedule data for a given area', async () => {
    const areaID = 1018; // Replace with a valid area ID for testing

    try {
      const scheduleData = await getFinnkinoSchedule(areaID);

      // Add your assertions based on the expected structure of the data
      expect(scheduleData).to.be.an('array'); // Assuming the extracted data is an array

      // Example assertions for specific properties of the extracted data
      if (scheduleData.length > 0) {
        expect(scheduleData[0]).to.have.property('Title');
        expect(scheduleData[0]).to.have.property('Language');
        expect(scheduleData[0]).to.have.property('Theatre');
        // Add more assertions for other properties as needed
      }
    } catch (error) {
      // If an error occurs during fetching or parsing, fail the test
      throw new Error('Test failed with error:', error);
    }
  });

  // Add more test cases as needed for different scenarios
});
