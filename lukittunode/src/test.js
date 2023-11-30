// Import the controller functions
const tmdbController = require('./controllers/tmdbController');

// Simulating a request object with params and query
const fakeReqGetMovieDetails = {
  params: { movieId: '245891' } // Replace '123' with an actual movie ID for testing
};

const fakeReqSearchByKeyword = {
  query: { qword: 'dragon' } // Replace 'Avengers' with an actual keyword for testing
};



// Simulating response objects
const fakeRes = {
  json: (data) => {
    console.log('Response:', data);
  },
  status: (code) => {
    console.log('Status Code:', code);
    return fakeRes;
  }
};
/*
// Test getMovieDetailsfromid function
(async () => {
  try {
    console.log('Testing getMovieDetailsfromid...');
    await tmdbController.getMovieDetailsfromid(fakeReqGetMovieDetails, fakeRes);
  } catch (error) {
    console.error('Error occurred in getMovieDetailsfromid:', error);
  }
})();

// Test searchbykeyword function
(async () => {
  try {
    console.log('Testing searchbykeyword...');
    await tmdbController.searchbykeyword(fakeReqSearchByKeyword, fakeRes);
  } catch (error) {
    console.error('Error occurred in searchbykeyword:', error);
  }
})();

//Test getcast function
(async () => {
  try {
    console.log('Testing getcast...');
    await tmdbController.getcast(fakeReqGetMovieDetails, fakeRes);
  }catch (error){
    console.error('error occurred in getcast', error);
  }
})();
*/
//Test getSimilar function
(async () => {
  try {
    console.log ('testing get similar...');
    await tmdbController.getSimilarMovies(fakeReqGetMovieDetails, fakeRes);
  } catch (error){
    console.error('error occurred', error);
  }
})();