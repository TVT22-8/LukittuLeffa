const pool = require('../../db_pool/pool');
const fetchfromid = require('../utils/fetchfromid');


exports.getUsersReviews = async(req,res) => {
    const{uId} = req.params;
    try{
        const result = await pool.query('SELECT reviewid, reviewtext, rating, reviewdate, watchhistory_movieid FROM watchreviews WHERE userlukittu_userid = $1',
        [uId]);

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
            result.rows
                .filter((row) => row.watchhistory_movieid === movieId)
                .forEach((rowToUpdate) => {
                    if (rowToUpdate) {
                        rowToUpdate.title = movieTitle;
                    }
                });
        });
        
        const modifiedResult = result.rows.map(({ title, ...rest }) => ({
            ...rest,
            title: title && title.title ? title.title : 'Title not found'
        }));
        
        res.json(modifiedResult);

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

exports.getTwoLatestReviewsFromUsersGroups = async (req, res) => {
    const {uId} = req.params;
    try{
        const result = await pool.query(`WITH RankedReviews AS (
            SELECT
              wr.reviewtext,
              wr.rating,
              TO_CHAR(wr.reviewdate, 'DD.MM.YYYY') AS reviewdate,
              wr.watchhistory_movieid,
              wr.userlukittu_userid,
              gm.groupid,
              wg.groupname,
              ROW_NUMBER() OVER (PARTITION BY gm.groupid ORDER BY wr.reviewdate DESC) AS row_num
            FROM
              watchreviews wr
              JOIN group_membership gm ON wr.userlukittu_userid = gm.userid
              JOIN watchgroup wg ON gm.groupid = wg.groupid
            WHERE
              gm.groupid IN (SELECT groupid FROM group_membership WHERE userid = $1)
          )
          SELECT
            reviewtext,
            rating,
            reviewdate,
            watchhistory_movieid,
            ul.username,
            groupid, 
            groupname
          FROM
            RankedReviews
            join userlukittu ul on userlukittu_userid = ul.userid
          WHERE
            row_num <= 1;`, [uId]);
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
                result.rows
                    .filter((row) => row.watchhistory_movieid === movieId)
                    .forEach((rowToUpdate) => {
                        if (rowToUpdate) {
                            rowToUpdate.title = movieTitle;
                        }
                    });
            });
            
            const modifiedResult = result.rows.map(({ title, ...rest }) => ({
                ...rest,
                title: title && title.title ? title.title : 'Title not found'
            }));
            
            res.json(modifiedResult);

    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server Error when fetching TWO latest Reviews' });
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
            result.rows
                .filter((row) => row.watchhistory_movieid === movieId)
                .forEach((rowToUpdate) => {
                    if (rowToUpdate) {
                        rowToUpdate.title = movieTitle;
                    }
                });
        });
        
        const modifiedResult = result.rows.map(({ title, ...rest }) => ({
            ...rest,
            title: title && title.title ? title.title : 'Title not found'
        }));
        
        res.json(modifiedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error when fetching five latest Reviews' });
    }
};


