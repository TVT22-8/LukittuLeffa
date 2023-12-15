const { expect } = require('chai');
const sinon = require('sinon');
const movieController = require('../controllers/moviesController');

describe('Test movieController Functions', () => {
  

  it('should get user watch history', async () => {
    const userId = '30';
    

    const req = { params: { uId: userId } };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await movieController.getUserWatchHistory(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');
   
  });

  it('Should get user similar', async()=>{
    
    const userId = '22';
    

    const req = { params: { uId: userId } };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await movieController.getUsersSimilars(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');

    result.forEach(item => {
    expect(item).to.be.an('object');
    const movie = item;
    expect(movie).to.have.property('title');
    expect(movie).to.have.property('poster_path');
    expect(movie).to.have.property('vote_average');
    expect(movie).to.have.property('movieId');
    }); 
  });


  
});
