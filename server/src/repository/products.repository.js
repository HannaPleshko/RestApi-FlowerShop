const { pool } = require('../DB');

async function getProductsDB() {
  const client = await pool.connect();
  const sql = `SELECT PT.ID, PT.ProductName, PT.Price, PR.ProviderName, PT.Provider_ID  
  FROM Product PT JOIN Provider PR ON PR.ID = PT.Provider_ID;`;
  const data = (await client.query(sql)).rows;
  return data;
}

async function getProductByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM Product WHERE ID = $1';
  const data = (await client.query(sql, [id])).rows;
  return data;
}

async function createProductDB(providerId, price, productName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = `INSERT INTO Product (Provider_ID, Price, ProductName) VALUES ($1,$2,$3) RETURNING *`;
    const data = (await client.query(sql, [providerId, price, productName])).rows;

    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

async function updateProductDB(id, providerId, price, productName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `UPDATE Product 
            SET Provider_ID = $1, Price = $2, ProductName = $3
            WHERE ID = $4 RETURNING*`;
    const data = (await client.query(sql, [providerId, price, productName, id])).rows;
    await client.query('COMMIT');
    return data;
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
    const sql = `DELETE FROM Product WHERE ID = $1 CASCADE RETURNING *`;
    const data = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    return data;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    return [];
  }
}

module.exports = { getProductsDB, getProductByIdDB, createProductDB, updateProductDB, deleteProductDB };
