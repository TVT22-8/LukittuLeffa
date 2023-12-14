//const { default: BaseComponent } = require('bootstrap/js/dist/base-component');
const pool = require('../../db_pool/pool');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {//Get all of the Users in Database
    const result = await pool.query('SELECT * FROM userlukittu');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error when fetching USERS' });
  }
};

exports.getUserById = async(req,res) => {
    const {uId} = req.params;
    try{//Get the Users Information when inserting Users Id
        const result = await pool.query('SELECT * FROM userlukittu where userid=$1;',
        [uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when fetching USER by ID'});
    }
};

exports.getUserByUsername = async(username) => {
  try{//This is used to fetch the username for verifying login, the username parameter comes from fronted
      const result = await pool.query('SELECT * FROM userlukittu where username=$1;',
      [username]);
      return result.rows
      //res.json(result.rows)
  } catch (error) {
      console.error(error);
      res.status(500).json({error:'Server error when fetching USER by Username'});
  }
};

exports.getUsersGroups = async (req, res) => {
  const {uId} = req.params;
    try{//Get all of the Groups the User is part of
        const result = await pool.query(`select wg.groupid, wg.groupname, wg.description, gm.is_admin, username 
        from watchgroup wg join group_membership gm on wg.groupid = gm.groupid 
        join userlukittu u on gm.userid = u.userid where u.userid = $1`,
        [uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error when fetching Users Groups by userID'});
        }
  };


exports.createUser = async (req, res) => {
  
  const { uname, pwd } = req.body.credentials;
  try {//Creates a new User and Hashes the password
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(pwd, 10, (err, hash) => {
        if (err) {
          console.error('Error generating hash:', err);
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  
    const result = await pool.query(
      'INSERT INTO userlukittu (username, pwd) VALUES ($1, $2) RETURNING *',
      [uname, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error when creating an User' });
  }
};

exports.deleteUser = async (req, res) => {
    const {uId} = req.params;
    try {//DELETE USER
        await pool.query('DELETE FROM userlukittu WHERE userid = $1', [uId]);
            res.json({message: 'User deleted succesfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error when deleting an User'});
    }
};
