const chai = require('chai');
const expect = chai.expect;
const getFinnkinoNews = require('../utils/FinnkinoNews'); // Update the path as needed

describe('Finnkino News API Tests', () => {
  it('should fetch and parse Finnkino news successfully', async () => {
    try {
      const news = await getFinnkinoNews();
      // Check if the result is an array
      expect(news).to.be.an('array');

      // Assuming at least one news article is returned
      const firstArticle = news[0];
      // Validate keys in the first article
      expect(firstArticle).to.have.property('title');
      expect(firstArticle).to.have.property('publishDate');
      expect(firstArticle).to.have.property('htmlLead');
      expect(firstArticle).to.have.property('articleURL');
      expect(firstArticle).to.have.property('imageURL');
      expect(firstArticle).to.have.property('thumbnailURL');

      // Assuming date format for publishDate
      expect(/^\d{4}-\d{2}-\d{2}/.test(firstArticle.publishDate)).to.be.true;
    } catch (error) {
      // Fail the test if an error occurs during execution
      throw new Error('Test failed: ' + error.message);
    }
  });


});
