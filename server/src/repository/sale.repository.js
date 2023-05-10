const { pool } = require('../DB');

async function getSaleDB() {
  const client = await pool.connect();
  const sql = `SELECT sale.ID, sale.AMOUNT, sale.PRODUCT_COST, customer.CUSTOMERNAME, sale.CUSTOMER_ID, sale.PRODUCT_ID product.PRODUCTNAME 
    FROM sale 
    JOIN customer ON customer.id=sale.CUSTOMER_ID
    JOIN product ON product.id=sale.PRODUCT_ID;`;
  const data = (await client.query(sql)).rows;
  return data;
}

async function getSaleByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM sale WHERE id=$1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createSaleDB(product_ID, customer_ID, amount, cost) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `INSERT INTO sale (PRODUCT_ID, CUSTOMER_ID, AMOUNT,PRODUCT_COST)
          VALUES ($1,$2,$3,$4) RETURNING *`;
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
    const sql = `UPDATE sale SET PRODUCT_ID=$1, CUSTOMER_ID=$2, AMOUNT=$3, PRODUCT_COST=$4
            WHERE id=$5 RETURNING*)`;
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
    const sql = `DELETE FROM sale WHERE id=$1 RETURNING *`;
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
