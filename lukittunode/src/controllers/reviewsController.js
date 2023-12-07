const pool = require('../../db_pool/pool');

exports.getUsersReviews = async(req,res) => {
    const{uId} = req.params;
    try{
        const result = await pool.query('SELECT reviewid, reviewtext, rating, reviewdate, watchhistory_movieid FROM watchreviews WHERE userlukittu_userid = $1',
        [uId]);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Server error when fetching Users Reviews'});
    }
};

exports.getMovieReviews = async(req,res) => {
    const{movieId} = req.params;
    try{
        const result = await pool.query('SELECT * FROM watchreviews WHERE watchhistory_movieid = $1',
        [movieId]);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Server error when fetching Users Reviews'});
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
        res.status(500).json({error:'Server error when Posting a new Review'});
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
        res.status(500).json({error:'Server Error when removing an User Review by ID'});
    }
};