const chai = require('chai');
const chaiHttp = require('chai-http');
const fetchMock = require('fetch-mock');
const tmdbController = require('../controllers/tmdbController'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('tmdbController', () => {
  afterEach(() => {
    fetchMock.restore(); // Restore fetch mock after each test
  });

  it('should get movie details by ID', async () => {
    const mockMovieId = '116776';
    const mockMovieData = { id: mockMovieId, title: 'Mock Movie', };

    fetchMock.get(`/api/movie/${mockMovieId}`, mockMovieData);

    // Simulating the request object and response object
    const req = { params: { movieId: mockMovieId } };
    const res = { json: data => data }; // Mocking the response.json() method

    await tmdbController.getMovieDetailsfromid(req, res);
    
    
  });

  it('should search movies by keyword', async () => {
    const mockQuery = 'action'; 
    const mockSearchResult = [
      { id: 1, title: 'Action Movie 1', poster_path: '/path/to/poster1.jpg', release_date: '2023-01-01', popularity: 8.5 },
      
    ];

    fetchMock.get(`/api/search?query=${mockQuery}`, mockSearchResult);

    // Simulating the request object and response object
    const req = { query: { query: mockQuery } };
    const res = { json: data => data };

    // Call the method being tested
    await tmdbController.searchbykeyword(req, res);
  });

  it('should get cast details by movie ID', async () => {
    const mockMovieId = '116776'; 
    const mockCreditsData = [
      { id: 1, name: 'Actor 1', character: 'Character 1' },
      { id: 2, name: 'Actor 2', character: 'Character 2' },
      
    ];

    fetchMock.get(`/api/credits/${mockMovieId}`, mockCreditsData);

    // Simulating the request object and response object
    const req = { params: { movieId: mockMovieId } };
    const res = { json: data => data }; // Mocking the response.json() method

    
    await tmdbController.getcast(req, res);


  });

  it('should get similar movies by movie ID', async () =>{
    const mockMovieId = '116776'; 
    const mockSimilarMovieData = [
      {movie: 1, name: 'movie 1'},
      {movie: 2, name: 'movie 2'}
    ];

    fetchMock.get(`/api/${mockMovieId}/recommendations`, mockSimilarMovieData);
    // Simulating the request object and response object
    
    const req = { params: { movieId: mockMovieId } };
    const res = { json: data => data }; // Mocking the response.json() method

    await tmdbController.getSimilarMovies(req, res);
  } )
  
});

  
  

