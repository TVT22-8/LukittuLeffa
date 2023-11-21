const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3002;

app.use(bodyParser.json());

const pool = new Pool({
    user:'hannu',
    host:'dpg-cl4adijiu76s73b76o3g-a.frankfurt-postgres.render.com',
    database:'lukittuleffa',
    password:'QRJCOAgxIfja2oofokMvQVcl8Q2Q2DiH',
    port:5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/api/users',async(req, res)=>{
    try{
        const result = await pool.query('SELECT * FROM userlukittu');
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'internal Server Error'});
    }
});

app.post('/api/users', async (req, res)=>{
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

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});