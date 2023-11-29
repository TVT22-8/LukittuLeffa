//Pool required to connect to postgreSQL
const { Pool } = require('pg');

const pool = new Pool({
    user:'hannu',
    host:'dpg-cl4adijiu76s73b76o3g-a.frankfurt-postgres.render.com',
    database:'lukittuleffa',
    password:'QRJCOAgxIfja2oofokMvQVcl8Q2Q2DiH',
    port:5432,
    ssl: {
        rejectUnauthorized: false
        //Skips SSL not allowing outsider to enter database
    }
});

//If there is a error in PostgreSQL connection
pool.on('error', (err) => {
    console.error('Unexpecter error on idle client', err);
    process.exit(-1);//Exit node.js, severe error.
});

module.exports = pool;