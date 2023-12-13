const pool = require('../../db_pool/pool');
const fetchfromid = require('../utils/fetchfromid');

exports.getAllGroups = async(req, res) => {
    try{
        const result = await pool.query('SELECT * FROM watchgroup');
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

exports.getAllMembersByID = async(req,res) => {
    const {groupId} = req.params;

    console.log('groupid: ', groupId);
    try{
        const result = await pool.query('SELECT u.userid, u.username, is_admin FROM userlukittu u JOIN group_membership gm ON u.userid = gm.userid JOIN watchgroup wg ON gm.groupid = wg.groupid WHERE wg.groupid = $1',
        [groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

exports.createGroup = async(req, res) => {
    const {gName, description, ownerId} = req.body;
    try{
        const result = await pool.query('INSERT INTO watchgroup (groupname, description, owner_userid) VALUES ($1, $2, $3) RETURNING *',
        [gName, description, ownerId]);
        res.json(result.rows[0]);
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

exports.addMember = async(req, res) =>{
    const{groupId, newMember} = req.body;
    try{
        const result = await pool.query('INSERT INTO group_membership(userid, groupid) VALUES ($1, $2)',
        [newMember, groupId]
        );
        res.json(result.rows);
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};


exports.removeMember = async (req, res) => {
    const { groupId, adminId, deletedId } = req.params;

    try {
        const groupResult = await pool.query('SELECT * FROM watchgroup WHERE groupid = $1', [groupId]);

        if (groupResult.rows.length === 0) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const group = groupResult.rows[0];

        const moderatorId = group.owner_userid;
        console.log('deleted user id: ',deletedId);
        console.log('admin trier: ',adminId);
        console.log('moderator id: ', moderatorId) // PreSelected userids

        if (moderatorId.toString() !== adminId.toString()) {
            return res.status(403).json({ error: 'Permission denied. Only the moderator can remove users.' });
        }

        const result = await pool.query(
            'DELETE FROM group_membership WHERE userid = $1 AND groupid = $2',
            [deletedId, groupId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found in the group' });
        }

        res.json({ message: 'User removed successfully', updatedGroup: group });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteGroup = async (req, res) => {
    const {groupId, adminId} = req.params;

    try{
        const groupResult = await pool.query('SELECT * FROM watchgroup WHERE groupid = $1', [groupId]);
        if (groupResult.rows.length === 0){
            return res.status(404).json({error: 'Group not found'});
        }

        const group = groupResult.rows[0];
        const moderatorId = group.owner_userid;

        if(moderatorId.toString() !== adminId.toString()){
            return res.status(403).json({error: 'Permission denied. Only the moderator can remove group'});
        }

        const result = await pool.query(
            'DELETE FROM watchgroup WHERE groupid = $1',
            [groupId]
        );

        res.json({message:'Group removed succesfully', updatedGroup: result.rows[0]});
    }

    catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.getGroupChatsByID = async (req,res) => {
    const {groupId} = req.params;
    try{
        const result = await pool.query("SELECT chat_id, ul.username, watchgroup_groupid, message_text, TO_CHAR(timestamp, 'DD.MM.YY HH24:MI') AS timestamp FROM group_chat gc JOIN userlukittu ul ON gc.userlukittu_userid = ul.userid WHERE gc.watchgroup_groupid = $1",
        [groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error Getting Groupchats from Group: ' + groupId})
    }
};

exports.postGroupChat = async (req,res) => {
    const{uId, groupId, chatText} = req.body;
    try{
        const result = await pool.query("SELECT insert_group_chat_message($1, $2, $3);",
        [uId, groupId, chatText]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error Posting a Group Chat to Group: ' + groupId});
    }
};

exports.getGroupMembersReviews = async (req,res) => {
    const{groupId} = req.params;
    try{
        const result = await pool.query("SELECT reviewid, reviewtext, rating, TO_CHAR(reviewdate, 'DD.MM.YYYY') AS reviewdate, watchhistory_movieid, userlukittu_userid FROM watchreviews wr JOIN group_membership gm on wr.userlukittu_userid = gm.userid where gm.groupid = $1",
        [groupId]);
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
        res.status(500).json({error:'Server Error Getting Group Members reviews: ', groupId});
    }
};

