const pool = require('../../db_pool/pool');

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM userlukittu');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserbyId = async (req, res)=>{
    const {uId} = req.params;
    try{
        const result = await pool.query('SELECT * FROM userlukittu WHERE userId = $1', [uId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.createUser = async (req, res) => {
  const { uname, pwd } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO userlukittu (username, pwd) VALUES ($1, $2) RETURNING *',
      [uname, pwd]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
    const {uId} = req.params;

    try {
        await pool.query('DELETE FROM userlukittu WHERE userid = $1', [uId]);
            res.json({message: 'User deleted succesfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};