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

exports.createGroup = async(req, res) => {
    const {gName, description, members} = req.body;
    try{
        const result = await pool.query('INSERT INTO watchgroup (groupname, description, members) VALUES ($1, $2, $3) RETURNING *',
        [gName, description, members]
    );
        res.json(result.rows[0]);
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

        const moderatorId = group.members[0];
        console.log('deleted user id: ',deletedId);
        console.log('admin trier: ',adminId);
        console.log('moderator id: ', moderatorId) // The first member is the moderator

        if (moderatorId.toString() !== adminId.toString()) {
            return res.status(403).json({ error: 'Permission denied. Only the moderator can remove users.' });
        }

        const result = await pool.query(
            'UPDATE watchgroup SET members = array_remove(members, $1) WHERE groupid = $2 RETURNING *',
            [deletedId, groupId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found in the group' });
        }

        res.json({ message: 'User removed successfully', updatedGroup: result.rows[0] });

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
        const moderatorId = group.members[0];

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

exports.addMember = async(req, res) =>{
    const{groupName, adminId, newMember} = req.body;
    try{
        const result = await pool.query('UPDATE watchgroup SET members = array_append(members, $1) WHERE groupname = $2 RETURNING *',
        [newMember, groupName]
        );
        console.log(groupName, newMember);
        res.json(result.rows[0]);
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
};

/*insert INTO watchgroup (groupname, description, members)VALUES ('TestiRyhma', 'me olemme testiryhma joojoo', '{5}')

update watchgroup set members = array_append(members, 15) where groupname = 'TestiRyhma';

Select members[2] as first_member from watchgroup where groupname = 'TestiRyhma'; */