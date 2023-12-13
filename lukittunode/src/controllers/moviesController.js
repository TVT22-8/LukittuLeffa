const pool = require('../../db_pool/pool');

//WATCH HISTORY SEGMENT

exports.getUserWatchHistory = async(req, res) => {
    const {uId} = req.params;
    try{
        const result = await pool.query('SELECT movieid FROM watchhistory WHERE userlukittu_userid = $1',
        [uId]);
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when fetching an Users Watch History'});
    }
};

exports.addMovieToWatchHistory = async(req,res) => {
    const {movieId, uId} = req.body;
    try{
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
    try{
        const result = await pool.query('DELETE FROM watchhistory WHERE userlukittu_userid = $1 AND movieid = $2 RETURNING *',
        [uId, movieId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when removing a Movie from Users Watch History'});
    }
};