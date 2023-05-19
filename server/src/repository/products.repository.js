const { pool } = require('../DB');

async function getProductsDB() {
  const client = await pool.connect();
  const sql = `SELECT * FROM Product ORDER BY id`;
  const response = await client.query(sql);
  return {
    fields: response.fields.map(field => field.name),
    rows: response.rows,
  };
}

async function getProductByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Product WHERE ID = $1';
  const response = (await client.query(sql, [id])).rows;
  return response;
}

async function createProductDB(provider_id, price, productname) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Product (Provider_ID, Price, ProductName) VALUES ($1,$2,$3) RETURNING *`;
    const response = (await client.query(sql, [provider_id, price, productname])).rows;

    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateProductDB(id, provider_id, price, productname) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `UPDATE Product 
            SET Provider_ID = $1, Price = $2, ProductName = $3
            WHERE ID = $4 RETURNING*`;
    const response = (await client.query(sql, [provider_id, price, productname, id])).rows;
    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function deleteProductDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `DELETE FROM Product WHERE ID = $1 RETURNING *`;
    const response = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return response;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getProductsDB, getProductByIdDB, createProductDB, updateProductDB, deleteProductDB };
