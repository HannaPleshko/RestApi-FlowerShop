const { pool } = require('../DB');

async function getCustomerDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Customer';
  const response = await client.query(sql);
  return {
    fields: response.fields.map(field => field.name),
    rows: response.rows,
  };
}

async function getCustomerByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Customer WHERE id = $1';
  const response = (await client.query(sql, [id])).rows;
  return response;
}

async function createCustomerDB(customername) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Customer (CustomerName) VALUES ($1) RETURNING *`;
    const response = (await client.query(sql, [customername])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateCustomerDB(id, customername) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Customer SET CustomerName = $1 WHERE id = $2 RETURNING *`;
    const response = (await client.query(sql, [customername, id])).rows;

    await client.query('COMMIT');
    return response;
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
    const response = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getCustomerDB, getCustomerByIdDB, createCustomerDB, updateCustomerDB, deleteCustomerDB };
