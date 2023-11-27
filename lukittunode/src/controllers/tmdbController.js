const { fetchfromid } = require('../utils/fetchfromid');

const tmdbController = {
  getMovieDetailsfromid: async (req, res) => {
    try {
      const { movieid } = req.params;
      const data = await fetchfromid(movieid, ['title', 'tagline', 'genres', 'release_date', 'overview', 'popularity', 'runtime']);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  searchbykeyword: async(req, res) =>{
    try {
      const {qword} = req.params;
      const data = await MovieSearch(qword, ['title', 'poster_path', 'release_date', 'id'])
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = tmdbController;
