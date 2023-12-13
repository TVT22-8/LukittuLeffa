const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fetchMock = require('fetch-mock');
const MovieSearch = require('../utils/keywordsearch'); 

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('MovieSearch function tests', () => {
  afterEach(() => {
    fetchMock.restore(); // Restore fetchMock after each test
  });

  it('should fetch movies based on query and filter specific fields', async () => {
    const query = 'uuno turhapuro epsanjassa'; 
    const fields = ['title', 'overview']; 

    const mockResponse = {
      results: [
        {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
                35
            ],
            "id": 36769,
            "original_language": "fi",
            "original_title": "Uuno Epsanjassa",
            "overview": "Uuno Turhapuro is searching for a job and takes a correspondence course in tour guiding. Eventually he gets a job in a small travel agency and takes a group of Finnish tourists to Marbella, Spain. Unfortunately Uuno's father-in-law Tuura is in the group, too, with his wife and daughter, Uuno's wife Elisabet. Tuura tries to get a signature to an important paper from a minister who's having a holiday in the area. Meanwhile, Uuno just relaxes and enjoys the sun.",
            "popularity": 3.787,
            "poster_path": "/4EsFMtAKTJyrHDBmfvPkry09Eei.jpg",
            "release_date": "1985-09-27",
            "title": "Uuno Epsanjassa",
            "video": false,
            "vote_average": 6.1,
            "vote_count": 14
        }
        
      ],
    };

    fetchMock.getOnce(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY`, {
      status: 200,
      body: mockResponse,
    });

    const result = await MovieSearch(query, fields);
    
    // Assert the result based on the mocked response
    expect(result).to.deep.equal([
      { title: "Uuno Epsanjassa", overview: "Uuno Turhapuro is searching for a job and takes a correspondence course in tour guiding. Eventually he gets a job in a small travel agency and takes a group of Finnish tourists to Marbella, Spain. Unfortunately Uuno's father-in-law Tuura is in the group, too, with his wife and daughter, Uuno's wife Elisabet. Tuura tries to get a signature to an important paper from a minister who's having a holiday in the area. Meanwhile, Uuno just relaxes and enjoys the sun." },
      
    ]);
  });

  it('should handle API error', async () => {
    const query = 'InvalidQuery'; // Replace with an invalid query to simulate API error

    fetchMock.getOnce(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=YOUR_API_KEY`, {
      status: 404, // Simulate API error
    });

    const result = await MovieSearch(query, []);
    
    // Assert that the function returns an empty array on API error
    expect(result).to.deep.equal([]);
  });


});
