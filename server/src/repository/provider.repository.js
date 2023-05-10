const { pool } = require('../DB');

async function getProviderDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM provider';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getProviderByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM provider WHERE id=$1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createProviderDB(providerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `INSERT INTO provider (PROVIDERNAME)
          VALUES ($1) RETURNING *`;
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
    const sql = `UPDATE provider SET PROVIDERNAME=$1 WHERE id=$2 RETURNING*)
          VALUES ($1) RETURNING *`;
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
    const sql = `DELETE FROM provider WHERE id=$1 RETURNING *`;
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
