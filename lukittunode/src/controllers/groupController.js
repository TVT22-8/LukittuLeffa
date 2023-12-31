const { group } = require('console');
const pool = require('../../db_pool/pool');
const fetchfromid = require('../utils/fetchfromid');


exports.getAllGroups = async(req, res) => { 
    try{//Just shows every watchgroup
        const result = await pool.query('SELECT * FROM watchgroup'); 
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error Fetching every Group'});
    }
};

exports.getGroupInfoByID = async(req,res) => {
    const {groupId} = req.params;
    try {
        const result = await pool.query(`select groupid, groupname, description, owner_userid AS owner 
        from watchgroup where groupid = $1`,
        [groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error Fetching Group by Group ID'})
    }
};

exports.getAllMembersByID = async(req,res) => {
    const {groupId} = req.params;
    try{//Gets every member that belongs to group
        const result = await pool.query(`SELECT u.userid, u.username, is_admin FROM userlukittu u 
        JOIN group_membership gm ON u.userid = gm.userid JOIN watchgroup wg ON gm.groupid = wg.groupid WHERE wg.groupid = $1`,
        [groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error Fetching Users by groupId'});
    }
};

exports.createGroup = async(req, res) => {
    const {gName, description, ownerId} = req.body;
    try{//Creates a group with inserts GroupName,Description and OwnerId
        await pool.query('BEGIN');

    // Insert into watchgroup
    const groupResult = await pool.query(
      `INSERT INTO watchgroup (groupname, description, owner_userid) 
       VALUES ($1, $2, $3) RETURNING groupid`,
      [gName, description, ownerId]
    );

    const groupId = groupResult.rows[0].groupid;

    // Insert into group_membership to add the owner as a member
    await pool.query(
      `INSERT INTO group_membership (userid, groupid) 
       VALUES ($1, $2)`,
      [ownerId, groupId]
    );

    // Commit the transaction
    await pool.query('COMMIT');

    res.json({ success: true });
  } catch (error) {
    // Rollback the transaction if there's an error
    await pool.query('ROLLBACK');
        res.status(500).json({error:'Internal Server Error when creating a Group'});
    }
};

exports.addMember = async(req, res) =>{
    const{groupId, newMember} = req.body;
    try{//Add a member into a group, should only go through after joinrequest 
        const result = await pool.query('INSERT INTO group_membership(userid, groupid) VALUES ($1, $2)',
        [newMember, groupId]
        );
        res.json(result.rows);
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error when adding a Member'});
    }
};


exports.removeMember = async (req, res) => {
    const { groupId, deletedId } = req.params;
    try {//Remove a user from the group, only the right admin ID can delete a member from group
        const result = await pool.query(
            'DELETE FROM group_membership WHERE userid = $1 AND groupid = $2',
            [deletedId, groupId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error when removing Member from group' });
    }
};

exports.deleteGroup = async (req, res) => {
    const {groupId} = req.params;
    try{//Delete a Group
        await pool.query('BEGIN');

        // Delete Watch Group
        await pool.query(
          `delete from watchgroup where groupid = $1`,
          [groupId]
        );
    
        // Deletes every member from Group Membership
        await pool.query(
          `delete from group_membership where groupid = $1`,
          [groupId]
        );
    
        // Commit the transaction
        await pool.query('COMMIT');
    
        res.json({ success: true });
      } catch (error) {
        // Rollback the transaction if there's an error
        await pool.query('ROLLBACK');
        res.status(500).json({error: 'Internal Server Error Deleting a Group'});
    }
};

exports.getGroupChatsByID = async (req,res) => {
    const {groupId} = req.params;
    try{//Get all of the groups chats By group ID
        const result = await pool.query(`SELECT chat_id, ul.username, message_text, 
        TO_CHAR(timestamp, 'DD.MM.YY HH24:MI') AS timestamp FROM group_chat gc 
        JOIN userlukittu ul ON gc.userlukittu_userid = ul.userid WHERE gc.watchgroup_groupid = $1`,
        [groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error Getting Groupchats from Group: ' + groupId})
    }
};

exports.postGroupChat = async (req,res) => {
    const{uId, groupId, chatText} = req.body;
    try{//Add a new text to the chat, however only the latest 30 texts stay. latest inserts are deleted
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
    try{//Get all of the groupMembers and all of their Movie Reviews
        const result = await pool.query(`SELECT reviewid, reviewtext, rating, TO_CHAR(reviewdate, 'DD.MM.YYYY') AS reviewdate, 
        watchhistory_movieid, userlukittu_userid FROM watchreviews wr JOIN 
        group_membership gm on wr.userlukittu_userid = gm.userid where gm.groupid = $1 ORDER BY reviewdate DESC`,
        [groupId]);
        const watchhistoryMovieIds = result.rows.map((entry) => entry.watchhistory_movieid);
        //console.log(watchhistoryMovieIds);

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


//Join requests
exports.insertJoinRequest = async (req,res) => {
    const {uId, groupId} = req.body;
    try{
        const result = await pool.query(`insert into joinrequest(status, userlukittu_userid, watchgroup_groupid)
        VALUES(false, $1, $2) returning *`, [uId, groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server Error Inserting Join Request'});
    }
};

exports.viewAdminsJoinRequests = async (req,res) => {
    const {adminId} = req.params;
    try{
        const result = await pool.query(`SELECT
        jr.*,
        u.username AS admin_username,
        requester.username AS requester_username,
        wg.groupname
      FROM
        joinrequest jr
      JOIN
        watchgroup wg ON jr.watchgroup_groupid = wg.groupid
      JOIN
        userlukittu u ON wg.owner_userid = u.userid
      JOIN
        userlukittu requester ON jr.userlukittu_userid = requester.userid
      WHERE
        jr.status = false AND u.userid = $1`, [adminId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error Fetching Join Requests by Admin ID'});
    }
};

exports.acceptJoinRequest = async (req,res) => {
    const {uId, groupId} = req.body;
    console.log(uId, groupId);
    try{
        // Start a transaction
    await pool.query('BEGIN');

    // Update joinrequest
    await pool.query(
      'UPDATE joinrequest SET status = true WHERE userlukittu_userid = $1 AND watchgroup_groupid = $2',
      [uId, groupId]
    );

    // Insert into group_membership
    await pool.query(
      'INSERT INTO group_membership (userid, groupid) VALUES ($1, $2)',
      [uId, groupId]
    );

    // Commit the transaction
    await pool.query('COMMIT');

    res.json({ success: true });
  } catch (error) {
    // Rollback the transaction if there's an error
    await pool.query('ROLLBACK');
        console.error(error);
        res.status(500).json({error: 'Server Error Accepting and Inserting the user to Group'});
    }
};

exports.rejectJoinRequest = async (req,res) => {
    const {uId, groupId} = req.body;
    try {
        const result  = await pool.query(`delete from joinrequest where userlukittu_userid = $1 
        AND watchgroup_groupid = $2;`,[uId,groupId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error Rejecting users Join Request'});
    }
};
