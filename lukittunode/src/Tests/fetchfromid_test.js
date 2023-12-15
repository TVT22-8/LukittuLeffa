const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fetchMock = require('fetch-mock');
const fetchfromid = require('../utils/fetchfromid'); 
const { apiKey } = require('../config');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('fetchfromid function tests', () => {
  afterEach(() => {
    fetchMock.restore(); // Restore fetchMock after each test
  });

  it('should fetch movie details without specific fields', async () => {
    const movieId = 116776; 
    const mockResponse = {
        adult: false,
        backdrop_path: null,
        belongs_to_collection: {
          backdrop_path: "/i5ECrR2zT7GQl0J8WdyGTm9D6d6.jpg",
          id: 386410,
          name: "Dragon Ball Collection",
          poster_path: "/8N1nLnRbwErhuIMekAqER0uBuf0.jpg"
        },
        budget: 0,
        genres: [
            {id: 28,
            name: "Action"},
            {id: 16,
            name: "Animation"}
        ],
        homepage: "",
        id: 116776,
        imdb_id: "tt0142248",
        original_language: "ja",
        original_title: "ドラゴンボール 魔訶不思議大冒険",
        overview: "Master Roshi has succeeded at the one mission he valued most: to train Goku and Krillin to become ultimate fighters. So, he arranges for them to test their mettle at a competition hosted by Emperor Chiaotzu. Not everyone's playing by the rules, however, as a member of the ruler's household schemes to use the Dragonballs to extort money and power from the royal.",
        popularity: 236.339,
        poster_path: "/5aXG0B3TYTpQsodXzvYCkKQfpB1.jpg",
        production_companies: [{
            id: 5542,
            logo_path: "/ayE4LIqoAWotavo7xdvYngwqGML.png",
            name: "Toei Animation",
            origin_country: "JP"
        }],
        production_countries: [{
            iso_3166_1: "JP",
            name: "Japan"
        }],
        release_date: "1988-07-09",
        revenue: 8201600,
        runtime: 48,
        spoken_languages: [
          {
            english_name: "Japanese",
            iso_639_1: "ja",
            name: "日本語"
          }
        ],
        status: "Released",
        tagline: "",
        title: "Dragon Ball: Mystical Adventure",
        video: false,
        vote_average: 6.8,
        vote_count: 230 
      };
      
      
      
      
    
    fetchMock.getOnce(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, {
      status: 200,
      body: mockResponse
    });

    const result = await fetchfromid(movieId);
// could use following assertion: expect(result).to.deep.equal(mockResponse); but if the actual respond is updated test will fail
// current assertions below test for relevant information that is actually used
    expect(result).to.be.an('object');
    const object = result;
    expect(object).to.have.property('title');
    expect(object).to.have.property('id');
    expect(object).to.have.property('overview');
    expect(object).to.have.property('poster_path');
  });

  it('should fetch movie details with specific fields', async () => {
    const movieId = 116776; // Replace with an actual movie ID for testing
    const mockResponse = {
        id: 116776,
        title: "Dragon Ball: Mystical Adventure",
        overview: "Master Roshi has succeeded at the one mission he valued most: to train Goku and Krillin to become ultimate fighters. So, he arranges for them to test their mettle at a competition hosted by Emperor Chiaotzu. Not everyone's playing by the rules, however, as a member of the ruler's household schemes to use the Dragonballs to extort money and power from the royal.",
        // Other movie details...
      };
    const fields = ['title', 'overview']; 
    fetchMock.getOnce(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, {
      status: 200,
      body: mockResponse
    });

    const result = await fetchfromid(movieId, fields);
    expect(result).to.deep.equal({ title: mockResponse.title, overview: mockResponse.overview });
  });

  it('should handle API error', async () => {
    const movieId = 245981; 

    fetchMock.getOnce(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, {
      status: 404 // Simulate API error
    });

    await expect(fetchfromid(movieId)).to.be.rejectedWith('Request failed with status 404');
  });

  
});
