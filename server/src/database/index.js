const { ConnectionDB } = require('./connection');

class Database extends ConnectionDB {
  constructor(client, pool) {
    super(client, pool);
  }
}

module.exports = { Database }