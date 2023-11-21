//Barebones GET and POST requests for user data
//Sends only as JSON currently
//In POSTMAN -> BODY -> RAW -> JSON for POST

const express =  require ('express');
const router = express.Router();
const pool = require('../db_pool/pool')

router.get('/users',async(req, res)=>{
    try{
        const result = await pool.query('SELECT * FROM userlukittu');
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'internal Server Error'});
    }
});

router.post('/users', async (req, res)=>{
    const {uname, pwd} = req.body;

    try{
        const result = await pool.query(
            'INSERT INTO userlukittu (username, pwd) VALUES ($1, $2) RETURNING *',
            [uname, pwd]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

module.exports = router;