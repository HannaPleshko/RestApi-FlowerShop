const { pool } = require('../DB');

async function getCustomerDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Customer';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getCustomerByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Customer WHERE id = $1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createCustomerDB(customerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Customer (CustomerName) VALUES ($1) RETURNING *`;
    const data = (await client.query(sql, [customerName])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateCustomerDB(id, customerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Customer SET CustomerName = $1 WHERE id = $2 RETURNING *`;
    const data = (await client.query(sql, [customerName, id])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function deleteCustomerDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `DELETE FROM Customer WHERE id = $1 RETURNING *`;
    const data = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getCustomerDB, getCustomerByIdDB, createCustomerDB, updateCustomerDB, deleteCustomerDB };
