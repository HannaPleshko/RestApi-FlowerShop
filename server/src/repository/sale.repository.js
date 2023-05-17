const { pool } = require('../DB');

async function getSaleDB() {
  const client = await pool.connect();
  const sql = `SELECT * FROM Sale`;
  const response = await client.query(sql);

  return {
    fields: response.fields.map(field => field.name),
    rows: response.rows
  };
}

async function getSaleByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Sale WHERE ID = $1';
  const response = (await client.query(sql, [id])).rows;
  return response;
}

async function createSaleDB(product_id, customer_id, amount, cost) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Sale (Product_ID, Customer_ID, Amount, Cost) VALUES ($1, $2, $3, $4) RETURNING *`;
    const response = (await client.query(sql, [product_id, customer_id, amount, cost])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateSaleDB(id, product_id, customer_id, amount, cost) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Sale SET Product_ID = $1, Customer_ID = $2, Amount=$3, Cost = $4 WHERE ID = $5 RETURNING*)`;
    const response = (await client.query(sql, [product_id, customer_id, amount, cost, id])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function deleteSaleDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `DELETE FROM Sale WHERE ID = $1 RETURNING *`;
    const response = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getSaleDB, getSaleByIdDB, createSaleDB, updateSaleDB, deleteSaleDB };
