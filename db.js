const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "store",
    password: "96super5User?69",
    port: 5432,
});

module.exports = pool;