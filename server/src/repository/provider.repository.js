const { pool } = require('../DB');

async function getProviderDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Provider';
  const response = await client.query(sql);

  return {
    fields: response.fields.map(field => field.name),
    rows: response.rows
  };
}

async function getProviderByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Provider WHERE ID = $1';
  const response = (await client.query(sql, [id])).rows;
  return response;
}

async function createProviderDB(providername) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Provider (ProviderName) VALUES ($1) RETURNING *`;
    const response = (await client.query(sql, [providername])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateProviderDB(id, providername) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Provider SET ProviderName = $1 WHERE ID = $2 RETURNING*`;
    const response = (await client.query(sql, [providername, id])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function deleteProviderDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `DELETE FROM Provider WHERE ID = $1 RETURNING *`;
    const response = (await client.query(sql, [id])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getProviderDB, getProviderByIdDB, createProviderDB, updateProviderDB, deleteProviderDB };
