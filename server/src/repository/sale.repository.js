const { pool } = require('../DB');

async function getSaleDB() {
  const client = await pool.connect();
  const sql = `SELECT S.ID, S.Amount, S.Cost, C.CustomerName, S.Customer_ID, S.Product_ID P.ProductName 
    FROM Sale S
    JOIN Customer C ON C.id = S.Customer_ID
    JOIN Product P ON P.id = S.Product_ID;`;
  const data = (await client.query(sql)).rows;
  return data
}

async function getSaleByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Sale WHERE ID = $1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createSaleDB(product_ID, customer_ID, amount, cost) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Sale (Product_ID, Customer_ID, Amount, Cost) VALUES ($1, $2, $3, $4) RETURNING *`;
    const data = (await client.query(sql, [product_ID, customer_ID, amount, cost])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateSaleDB(id, product_ID, customer_ID, amount, cost) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `UPDATE Sale SET Product_ID = $1, Customer_ID = $2, Amount=$3, Cost = $4 WHERE ID = $5 RETURNING*)`;
    const data = (await client.query(sql, [product_ID, customer_ID, amount, cost, id])).rows;

    await client.query('COMMIT');
    return data;
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
    const data = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getSaleDB, getSaleByIdDB, createSaleDB, updateSaleDB, deleteSaleDB };
