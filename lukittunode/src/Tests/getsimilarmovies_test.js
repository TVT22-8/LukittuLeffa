const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
const getSimilar = require('../utils/getsimilarmovies');

chai.use(chaiAsPromised);


// Mocking the fetch function for testing purposes
const mockFetch = async (url) => {
  if (url.includes('/movie/116776/recommendations')) { 
    const similarMovieObject = {
      "title": "Goku",
      "genre_ids": [
          28,
          16,
          14,
          27
      ],
      "genre_names": [
          "Action",
          "Animation",
          "Fantasy",
          "Horror"
      ]
    };

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(similarMovieObject),
    });
  } else {
    return Promise.resolve({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
  }
};


describe('getSimilar', () => {
  before(() => {
    global.fetch = mockFetch; // Setting up the mocked fetch globally
  });

  after(() => {
    delete global.fetch; // Clean up after the tests
  });

  it('should return similar movies for a valid movieId', async () => {
    const movieId = 116776; 
    const similarMovies = await getSimilar(movieId);
    expect(similarMovies).to.be.an('array'); 

    expect(similarMovies).to.have.lengthOf.above(0);
    
  });

  it('should throw an error for an invalid movieId', async () => {
    const invalidMovieId = -1; 
    await expect(getSimilar(invalidMovieId)).to.be.rejectedWith(Error);
    
  });
});
