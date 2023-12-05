const pool = require('../../db_pool/pool');

exports.getUserWatchHistory = async(req, res) => {
    const {uId} = req.params;
    try{
        const result = await pool.query('SELECT movieid FROM watchhistory WHERE userlukittu_userid = $1',
        [uId]);
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
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
        res.status(500).json({error:'Internal Server Error'});
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
        res.status(500).json({error:'Internal Server Error'});
    }
}
