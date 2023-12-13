const { expect } = require('chai');
const makeAPICall = require('../utils/api/api'); // Replace with the correct path

describe('makeAPICall function', () => {
  it('should fetch data from API with valid parameters', async () => {
    const baseUrl = 'https://api.example.com';
    const endpoint = 'someEndpoint';
    const token = 'validToken';

    // Replace this with your expected data structure/format
    const expectedData = {
      // Your expected data structure here
    };

    try {
      const data = await makeAPICall(baseUrl, endpoint, token);
      // Add your assertions here to validate the response data
      expect(data).to.deep.equal(expectedData); // Example assertion, modify as per your data format
    } catch (error) {
      // If it enters this block, it means there was an error with the API call
      // Fail the test
      throw new Error(`Test failed with error: ${error.message}`);
    }
  });

  it('should throw an error with invalid token', async () => {
    const baseUrl = 'https://api.example.com';
    const endpoint = 'someEndpoint';
    const invalidToken = 'invalidToken';

    try {
      await makeAPICall(baseUrl, endpoint, invalidToken);
      // If it reaches here without throwing an error, fail the test
      throw new Error('Test should have thrown an error for invalid token');
    } catch (error) {
      // Assert that the error message matches the expected error
      expect(error.message).to.include('API request failed');
    }
  });

  // Add more tests to cover different scenarios (e.g., network errors, invalid endpoints, etc.)
});
