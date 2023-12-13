const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
const getSimilar = require('../utils/FinnkinoNews');

chai.use(chaiAsPromised);


// Mocking the fetch function for testing purposes
const mockFetch = async (url) => {
  if (url.includes('/news')) { 
    const MockData = {

    }
    
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MockData),
      });
    } else {
      return Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });
    }
}
