const { pool } = require('../DB');

async function getProviderDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Provider';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getProviderByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Provider WHERE ID = $1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createProviderDB(providerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Provider (ProviderName) VALUES ($1) RETURNING *`;
    const data = (await client.query(sql, [providerName])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateProviderDB(id, providerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Provider SET ProviderName = $1 WHERE ID = $2 RETURNING*`;
    const data = (await client.query(sql, [providerName, id])).rows;

    await client.query('COMMIT');
    return data;
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
    const data = (await client.query(sql, [id])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getProviderDB, getProviderByIdDB, createProviderDB, updateProviderDB, deleteProviderDB };
