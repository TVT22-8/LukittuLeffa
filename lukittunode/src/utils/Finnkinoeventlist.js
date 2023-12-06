const fetch = require('node-fetch');
const xml2js = require('xml2js');

const fetchFinnkinoData = async () => {
  try {
    const response = await fetch('https://www.finnkino.fi/xml/Schedule/');
    const xmlData = await response.text();
    return xmlData;
  } catch (error) {
    console.error('Error fetching Finnkino data:', error);
    throw error;
  }
};

const extractData = (shows) => {
  return shows.map(show => {
    return {
      Title: show?.Title?.[0] ?? 'N/A',
      Language: show?.SpokenLanguage?.[0]?.Name ?? 'N/A',
      Subtitles: [
        show?.SubtitleLanguage1?.[0]?.Name ?? 'N/A',
        show?.SubtitleLanguage2?.[0]?.Name ?? 'N/A'
      ],
      ShowURL: show?.ShowURL?.[0] ?? 'N/A',
      LargeImagePortrait: show?.Images?.[0]?.EventLargeImagePortrait?.[0] ?? 'N/A'
    };
  });
};

const getFinnkinoEvents = async () => {
  try {
    const xmlData = await fetchFinnkinoData();
    const result = await xml2js.parseStringPromise(xmlData);

    const shows = result.Schedule.Shows[0].Show;
    const extractedData = extractData(shows);
    return extractedData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = getFinnkinoEvents ;

 
