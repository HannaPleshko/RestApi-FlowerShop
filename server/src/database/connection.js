const { Pool } = require('pg');
const { createTables } = require('./Queries/create_tables');

const credentials = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DATABASE,
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
};

const defaultPool = new Pool(credentials);

class ConnectionDB {
  constructor(pool = defaultPool) {
    this.pool = pool;
  }

  async initializeDB() {
    try {
      await createTables(this.pool);
      console.info(`Database initialization: success`);
    } catch (error) {
      console.error(`Connection. initializeDB. ${error}`);
    }
  }
}

module.exports = { ConnectionDB, defaultPool }
