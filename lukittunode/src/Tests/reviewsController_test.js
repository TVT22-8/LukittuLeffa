const { expect } = require('chai');
const sinon = require('sinon');
const reviewsController = require('../controllers/reviewsController');

describe('Test User Review Functions', () => {
  

  it('should get user Reviews', async () => {
    const userId = '22';
    

    const req = { params: { uId: userId } };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await reviewsController.getUsersReviews(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');

    result.forEach(item => {
        expect(item).to.be.an('object');
        const movie = item;
        expect(movie).to.have.property('reviewid');
        expect(movie).to.have.property('reviewtext');
        expect(movie).to.have.property('rating');
        expect(movie).to.have.property('reviewdate');
        expect(movie).to.have.property('watchhistory_movieid');
        expect(movie).to.have.property('title');
        }); 
   
  });

  it('Should get Movies Every Review', async()=>{
    
    const moviesId = '28609';
    

    const req = { params: { movieId: moviesId } };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await reviewsController.getMovieReviews(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');

    result.forEach(item => {
    expect(item).to.be.an('object');
    const movie = item;
    expect(movie).to.have.property('reviewid');
    expect(movie).to.have.property('reviewtext');
    expect(movie).to.have.property('rating');
    expect(movie).to.have.property('reviewdate');
    expect(movie).to.have.property('username');
    });
  });

  it('Should get Five Latest Reviews', async()=>{
    
    
    const req = { };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await reviewsController.getFiveLatestReviews(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');

    result.forEach(item => {
    expect(item).to.be.an('object');
    const movie = item;
    expect(movie).to.have.property('reviewtext');
    expect(movie).to.have.property('rating');
    expect(movie).to.have.property('reviewdate');
    expect(movie).to.have.property('watchhistory_movieid');
    expect(movie).to.have.property('reviewer_username');
    expect(movie).to.have.property('title');
    });
  });
});
