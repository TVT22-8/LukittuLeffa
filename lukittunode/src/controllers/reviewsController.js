const pool = require('../../db_pool/pool');
const fetchfromid = require('../utils/fetchfromid');
const fetchingId = require('../utils/fetchfromid');

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
        const result = await pool.query("SELECT reviewid, reviewtext, rating, TO_CHAR(reviewdate, 'DD.MM.YYYY HH24:MI') AS reviewdate, ul.username FROM watchreviews JOIN userlukittu ul ON userlukittu_userid = ul.userid WHERE watchhistory_movieid = $1",
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

exports.getFiveLatestReviews = async (req, res) => {
    try {
        const result = await pool.query(`SELECT reviewtext, rating, TO_CHAR(reviewdate, 'DD.MM.YY HH24:MI') AS reviewdate, watchhistory_movieid, ul.username AS reviewer_username FROM watchreviews wr JOIN userlukittu ul ON wr.userlukittu_userid = ul.userid ORDER BY wr.reviewdate DESC LIMIT 5`);

        const watchhistoryMovieIds = result.rows.map((entry) => entry.watchhistory_movieid);
        console.log(watchhistoryMovieIds);

        async function fetchTitles(movieId) {
            try {
                const movieTitle = await fetchfromid(movieId, ['title']);
                return { movieId, movieTitle };
            } catch (error) {
                console.error(`Error fetching title for movie ID ${movieId}:`, error);
            }
        }

        for (const watchhistoryMovieId of watchhistoryMovieIds) {
            await fetchTitles(watchhistoryMovieId);
        }

        const titlesPromises = watchhistoryMovieIds.map((watchhistoryMovieId) => fetchTitles(watchhistoryMovieId));
        const movieTitles = await Promise.all(titlesPromises);

        // Update result.rows with movie titles
        movieTitles.forEach(({ movieId, movieTitle }) => {
            const rowToUpdate = result.rows.find((row) => row.watchhistory_movieid === movieId);
            if (rowToUpdate) {
                rowToUpdate.title = movieTitle;
            }
        });

        const modifiedResult = result.rows.map(({ title, ...rest }) => ({
            ...rest,
            title: title.title || 'Title not found' // Assuming 'title' is the property containing the movie title
        }));

        res.json(modifiedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error when fetching five latest Reviews' });
    }
};


