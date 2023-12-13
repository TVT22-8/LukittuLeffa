const pool = require('../../db_pool/pool');

exports.getUsersWatchlist = async (req,res) => {
    const {uId} = req.params;
    try{
        const result =  await pool.query('SELECT * FROM watchlist WHERE userlukittu_userid = $1',
        [uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error when fetching Users Watchlist' });
      }
};

exports.addMovieToUsersWatchlist = async (req,res) => {
    const{uId, movieId} = req.body;
    try{
        const result = await pool.query('INSERT INTO watchlist (movieid, userlukittu_userid) VALUES ($1, $2) RETURNING *',
        [movieId, uId]);
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when adding a Movie to Users Watch History'});
    }
};

exports.removeMovieFromUsersWatchlist = async (req,res) => {
    const{uId, movieId} = req.params;
    try{
        const result = await pool.query('DELETE FROM watchlist WHERE userlukittu_userid = $1 AND movieid = $2 RETURNING *',
        [uId, movieId]);
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when adding a Movie to Users Watch History'});
    }
};