require('dotenv').config();
const { Pool } = require('pg');
const { USER_DB, HOST_DB, NAME_DB, PASSWORD_DB, PORT_DB } = process.env;

const pool = new Pool({
  user: USER_DB,
  host: HOST_DB,
  database: NAME_DB,
  password: PASSWORD_DB,
  port: PORT_DB,
});

module.exports = { pool };
