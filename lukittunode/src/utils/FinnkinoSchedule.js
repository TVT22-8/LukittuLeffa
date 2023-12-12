const fetch = require('node-fetch');
const xml2js = require('xml2js');

const fetchFinnkinoData = async (areaID) => {
    try {
      const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${areaID}`);
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
        LargeImagePortrait: show?.Images?.[0]?.EventLargeImagePortrait?.[0] ?? 'N/A',
        Genres: show?.Genres?.[0] ?? 'N/A',
        Theatre: show?.Theatre?.[0] ?? 'N/A',
        TheatreAuditorium: show?.TheatreAuditorium?.[0] ?? 'N/A',
        TheatreAndAuditorium: `${show?.Theatre?.[0] || 'N/A'}, ${show?.TheatreAuditorium?.[0] || 'N/A'}`,
        PresentationMethodAndLanguage: `${show?.PresentationMethod?.[0] || 'N/A'}, ${show?.SpokenLanguage?.[0]?.Name || 'N/A'}`,
        PresentationMethod: show?.PresentationMethod?.[0] ?? 'N/A',
        dtAccounting: show?.dtAccounting?.[0] ?? 'N/A',
        dttmShowStart: show?.dttmShowStart?.[0] ?? 'N/A',
        dttmShowEnd: show?.dttmShowEnd?.[0] ?? 'N/A',
        ShowSalesStartTime: show?.ShowSalesStartTime?.[0] ?? 'N/A',
        ShowSalesEndTime: show?.ShowSalesEndTime?.[0] ?? 'N/A',
        ShowReservationStartTime: show?.ShowReservationStartTime?.[0] ?? 'N/A',
        ShowReservationEndTime: show?.ShowReservationEndTime?.[0] ?? 'N/A',
        };
    });
  };
  

  const getFinnkinoSchedule = async (areaID) => {
    try {
      const xmlData = await fetchFinnkinoData(areaID);
      const result = await xml2js.parseStringPromise(xmlData);
  
      const shows = result.Schedule.Shows[0].Show;
      const extractedData = extractData(shows);
      return extractedData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

module.exports = getFinnkinoSchedule ;

 
