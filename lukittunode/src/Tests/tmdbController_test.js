const chai = require('chai');
const expect = chai.expect;
const tmdbController = require('../controllers/tmdbController');

describe('tmdbController', () => {
  describe('getMovieDetailsfromid', () => {
    it('should get movie details by ID', async () => {
      const req = { params: { movieId: 123 } }; 
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data.title).to.be.a('string');
          
        },
        status: (code) => {
          expect(code).to.equal(200);
          return res;
        },
      };

      await tmdbController.getMovieDetailsfromid(req, res);
      expect(res).to.be.an('object');
    });

    it('should handle errors when getting movie details by ID', async () => {
      const req = { params: { movieId: 'invalid_movie_id' } };
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data).to.have.property('error');
          
        },
        status: (code) => {
          expect(code).to.equal(500);
          return res;
        },
      };

      await tmdbController.getMovieDetailsfromid(req, res);
    });
  });

  
  describe('searchbykeyword', () => {
    it('should search by keyword', async () => {
      const req = {
        query: {
          query: 'action',
        },
      };
    
      const res = {
        json: (data) => {
          expect(data).to.be.an('array'); 
        },
        status: (code) => {
          expect(code).to.equal(200); 
          return res;
        },
      };
    
      await tmdbController.searchbykeyword(req, res);
      expect(res).to.be.an('object');
    });
    

    it('should handle errors when searching by keyword', async () => {
      const req = { params: { movieId: 'invalid_query' } };
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data).to.have.property('error');
          
        },
        status: (code) => {
          expect(code).to.equal(500);
          return res;
        },
      };

      await tmdbController.searchbykeyword(req, res);
    });
  });

  describe('getcast', () => {
    it('should get cast for a movie', async () => {
      const req = { params: { movieId: 123 } }; 
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data.cast).to.be.an('array');
          
        },
        status: (code) => {
          expect(code).to.equal(200);
          return res;
        },
      };
    
      await tmdbController.getcast(req, res);
    });
    
    it('should handle errors when getting cast for a movie', async () => {
      const req = { params: { movieId: 'invalid_movie_id' } };
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data).to.have.property('error');
          
        },
        status: (code) => {
          expect(code).to.equal(500);
          return res;
        },
      };
    
      await tmdbController.getcast(req, res);
      expect(res).to.be.an('object');
    });
    
  });

  describe('getSimilarMovies', () => {
    it('should get similar movies', async () => {
      const req = { params: { movieId: 123 } }; 
      const res = {
        json: (data) => {
          expect(data).to.be.an('array');
          
        },
        status: (code) => {
          expect(code).to.equal(200);
          return res;
        },
      };
    
      await tmdbController.getSimilarMovies(req, res);
    });
    
    it('should handle errors when getting similar movies', async () => {
      const req = { params: { movieId: 'invalid_movie_id' } };
      const res = {
        json: (data) => {
          expect(data).to.be.an('object');
          expect(data).to.have.property('error');
          
        },
        status: (code) => {
          expect(code).to.equal(500);
          return res;
        },
      };
    
      await tmdbController.getSimilarMovies(req, res);
      expect(res).to.be.an('object');
      
    });
    
  });
});
