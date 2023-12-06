const fetch = require('node-fetch');
const xml2js = require('xml2js');

const FetchFinnkinoNews = async () => {
  try {
    const response = await fetch('https://www.finnkino.fi/xml/News');
    const xmlData = await response.text();
    return xmlData;
  } catch (error) {
    console.error('Error fetching Finnkino data:', error);
    throw error;
  }
};

const parseFinnkinoNews = (xmlData) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const newsArticles = result.News.NewsArticle;
        const parsedNews = newsArticles.map(article => {
          return {
            title: article.Title[0],
            publishDate: article.PublishDate[0],
            htmlLead: article.HTMLLead[0],
            articleURL: article.ArticleURL[0],
            imageURL: article.ImageURL[0],
            thumbnailURL: article.ThumbnailURL[0]
          };
        });
        resolve(parsedNews);
      }
    });
  });
};

const getFinnkinoNews = async () => {
  try {
    const xmlData = await FetchFinnkinoNews();
    const parsedNews = await parseFinnkinoNews(xmlData);
    return parsedNews;
  } catch (error) {
    console.error('Error getting Finnkino news:', error);
    throw error;
  }
};



module.exports = getFinnkinoNews; 
