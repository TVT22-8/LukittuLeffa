const fetch = require('node-fetch');
const { apiKey } = require('../config');
const baseUrl = 'https://api.themoviedb.org/3';

const genresList = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

function mapGenreIdsToNames(genreIds) {
  return genreIds.map((genreId) => {
    const foundGenre = genresList.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : 'Unknown'; // Return 'Unknown' if genre ID is not found in the list
  });
}

async function getSimilar(movieId) {
  try {
    const fetchUrl = `${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`;
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Process the received data here
    const similarMovies = data.results.map(movie => ({
      ...movie,
      genre_names: mapGenreIdsToNames(movie.genre_ids) // Convert genre_ids to genre_names
    }));
    

    return similarMovies;
  } catch (error) {
    console.error('Error fetching similar movies:', error.message);
    throw error;
  }
}

module.exports = getSimilar;

