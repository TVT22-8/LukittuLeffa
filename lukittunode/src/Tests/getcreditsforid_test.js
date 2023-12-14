const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fetchMock = require('fetch-mock');
const getCredits = require('../utils/getcreditsforid'); 
const { apiKey } = require('../config');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getCredits function tests', () => {
  afterEach(() => {
    fetchMock.restore(); // Restore fetchMock after each test
  });

  it('should fetch movie credits for a given movie ID', async () => {
    const movieId = 123; 
    const mockResponse = {
      cast: [
        { name: 'Actor 1', character: 'Character 1' },
        
      ],
      crew: [
        { name: 'Director 1', known_for_department: 'Directing' },
        { name: 'Writer 1', known_for_department: 'Writing' },
        { name: 'Producer 1', known_for_department: 'Producing' }
      ],
    };
  
    fetchMock.getOnce(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`, {
      status: 200,
      body: mockResponse,
    });
    
    const result = await getCredits(movieId);
    
    // Assert specific elements from the response
    expect(result).to.have.property('cast');
  expect(result).to.have.property('directing');
  expect(result).to.have.property('writing');
  expect(result).to.have.property('producing');
    // Add assertions for crew members or any specific data you want to test
  });
  

  it('should handle API error', async () => {
    const movieId = -1; // Replace with an invalid movie ID to simulate API error

    fetchMock.getOnce(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`, {
      status: 404, // Simulate API error
    });

    await expect(getCredits(movieId)).to.be.rejectedWith('Request failed with status 404');
  });

});
