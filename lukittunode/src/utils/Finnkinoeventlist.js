const fetch = require('node-fetch');
const xml2js = require('xml2js');

const fetchFinnkinoData = async () => {
  try {
    const response = await fetch('https://www.finnkino.fi/xml/Events/');
    const xmlData = await response.text();
    return xmlData;
  } catch (error) {
    console.error('Error fetching Finnkino data:', error);
    throw error;
  }
};

const extractData = (events) => {
  return events.map(event => {
    const title = event.Title?.[0] || 'N/A';
    const productionYear = event.ProductionYear?.[0] || 'N/A';
    const lengthInMinutes = event.LengthInMinutes?.[0] || 'N/A';
    const synopsis = event.Synopsis?.[0] || 'N/A';
    const largeImagePortrait = event.Images?.[0]?.EventLargeImagePortrait?.[0] || 'N/A';
    const URL = event.EventURL?.[0] || 'N/A';

    return {
      Title: title,
      ProductionYear: productionYear,
      LengthInMinutes: lengthInMinutes,
      Synopsis: synopsis,
      EventLargeImagePortrait: largeImagePortrait,
      EventURL: URL
    };
  });
};

const getFinnkinoEvents = async () => {
  try {
    const xmlData = await fetchFinnkinoData();
    const result = await xml2js.parseStringPromise(xmlData);

    const events = result?.Events?.Event || [];
    //console.log('Events:', events); // Log the 'events' array

    const extractedData = extractData(events);
    //console.log('Extracted Data:', extractedData); // Log the extracted data
    
    return extractedData;
  } catch (error) {
    console.error('Error retrieving Finnkino events:', error);
    throw error;
  }
};

module.exports = getFinnkinoEvents;
