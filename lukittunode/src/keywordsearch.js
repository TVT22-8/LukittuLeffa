const fetch = require('node-fetch');
const { apiKey } = require('./config');


const MovieSearch = (qword, ) => {
    const fetchUrl = `${baseUrl}/search/movie?query=${qword}&api_key=${apiKey}`;
}