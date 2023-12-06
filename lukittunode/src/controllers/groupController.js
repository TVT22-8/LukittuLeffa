const pool = require('../../db_pool/pool');

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
        const result = await pool.query('SELECT u.userid, u.username FROM userlukittu u JOIN group_membership gm ON u.userid = gm.userid JOIN watchgroup wg ON gm.groupid = wg.groupid WHERE wg.groupid = $1',
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
    const{groupId, newMember, adminBool} = req.body;
    try{
        const result = await pool.query('INSERT INTO group_membership(userid, groupid, is_admin) VALUES ($1, $2, $3)',
        [newMember, groupId, adminBool]
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

