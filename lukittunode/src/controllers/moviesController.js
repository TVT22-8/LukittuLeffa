const pool = require('../../db_pool/pool');
const getSimilar = require('../utils/getsimilarmovies');


//WATCH HISTORY SEGMENT

exports.getUserWatchHistory = async(req, res) => {
    const {uId} = req.params;
    try{//Get every movie in users Watch History
        const result = await pool.query('SELECT movieid FROM watchhistory WHERE userlukittu_userid = $1',
        [uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when fetching an Users Watch History'});
    }
};

exports.getUsersSimilars = async(req,res) => {
    const {uId} = req.params;
    try {//Get 9 similar movies from users latest entries in Watch History
        const result = await pool.query(`SELECT *
        FROM watchhistory
        WHERE userlukittu_userid = $1
        ORDER BY entry_order DESC
        LIMIT 3;`,[uId]);
        const movieIds = result.rows.map((entry) => entry.movieid);
        console.log(movieIds);

        let similarMovies = [];

        // Loop through each movie ID
        for (const movieId of movieIds) {
            // Fetch similar movies for the current movie ID
            const currentSimilarMovies = await getSimilar([movieId]);

            // Concatenate the results to the final array
            similarMovies = similarMovies.concat(currentSimilarMovies);
        }

        console.log(similarMovies);


        res.json(similarMovies);
    } catch (error) {
    console.error(error);
    res.status(500).json({error:'Server error when fetching an Similar Movies From Users History'});
    }
};


exports.addMovieToWatchHistory = async(req,res) => {
    const {movieId, uId} = req.body;
    try{//Add a movie to users Watch History, this also removes the movie from users Watch List!!!!
        const result = await pool.query('INSERT INTO watchhistory (movieid, userlukittu_userid) VALUES ($1, $2) RETURNING *',
        [movieId, uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when Adding a Movie to Users Watch History'});
    }
};

exports.removeMovieFromHistory = async(req,res)=>{
    const {movieId, uId} = req.params;
    try{//Remove a movive from Users Watch History
        const result = await pool.query('DELETE FROM watchhistory WHERE userlukittu_userid = $1 AND movieid = $2 RETURNING *',
        [uId, movieId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when removing a Movie from Users Watch History'});
    }
};