const pool = require('../../db_pool/pool');

exports.getUsersReviews = async(req,res) => {
    const{uId} = req.params;
    try{
        const result = await pool.query('SELECT reviewid, reviewtext, rating, reviewdate, watchhistory_movieid FROM watchreviews WHERE userlukittu_userid = $1',
        [uId]);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

exports.postMovieReview = async(req,res) => {
    const{revText, rating, movieId, uId} = req.body;
    try{
        const result = await pool.query('INSERT INTO watchreviews (reviewtext, rating, reviewdate, watchhistory_movieid, userlukittu_userid) VALUES ($1, $2, current_timestamp, $3, $4) RETURNING *',
        [revText, rating, movieId, uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

exports.removeReview = async(req,res) => {
    const{reviewId, uId} = req.params;
    try{
        const result = await pool.query('DELETE FROM watchreviews WHERE reviewid = $1 AND userlukittu_userid = $2 RETURNING *',
        [reviewId, uId]);
        res.json(result.rows);
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};