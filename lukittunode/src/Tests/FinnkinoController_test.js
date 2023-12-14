const { expect } = require('chai');
const sinon = require('sinon');
const FinnkinoController = require('../controllers/FinnkinoController'); 


describe('FinnkinoController', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('should get Finnkino events successfully', async () => {
    // Mocked XML data to simulate the API response
    const mockedXMLData = `
      <!-- xmlMockedData -->
    `;

    fetchStub.resolves({
      text: () => Promise.resolve(mockedXMLData)
    });

    const response = {
      json: sinon.stub()
    };
    await FinnkinoController.getEvents({}, response);

    expect(response.json.calledOnce).to.be.true;
    const events = response.json.firstCall.args[0];
    
    expect(events).to.be.an('array');
    
  });

  
  it('should get Finnkino news successfully', async () => {
    // Mocked news data to simulate the API response
    const mockednewsXMLData = `
      <!-- xmlMockedData -->
    `;

    fetchStub.resolves({
      text: () => Promise.resolve(mockednewsXMLData)
    });

    
    const response = {
      json: sinon.stub()
    };
    await FinnkinoController.getNews({}, response);

    
    expect(response.json.calledOnce).to.be.true;
    const news = response.json.firstCall.args[0];
    
    expect(news).to.be.an('array');
    
  });
  
  it('should get Finnkino Schedule successfully', async () => {

    mockedScheduleXMLData = `
    <!-- xmlMockedData -->
  `;

  fetchStub.resolves({
    text: () => Promise.resolve(mockedScheduleXMLData)
  });

  const request = {
    params: {
      areaID: '1018' 
    }
  };

  const response = {
    json: sinon.stub()
  };
  await FinnkinoController.getSchedule(request, response);
  
  expect(response.json.calledOnce).to.be.true;
  const news = response.json.firstCall.args[0];
  
  expect(news).to.be.an('array');

})
    
  });
  
  
