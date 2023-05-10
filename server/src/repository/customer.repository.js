const { pool } = require('../DB');
const { workerData, parentPort } = require('worker_threads');

process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection', err);
  process.exit(1);
});

if (require.main === module) {
  const worker = new Worker(__filename);
  worker.on('error', err => {
    console.error('Worker Error', err);
  });
}

async function getCustomerDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM customer';
  const data = (await client.query(sql)).rows;
  parentPort.postMessage(data);
}

async function getCustomerByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM customer WHERE id=$1';
  const data = (await client.query(sql, [id])).rows;
  parentPort.postMessage(data);
}

async function createCustomerDB(customerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `INSERT INTO customer (CUSTOMERNAME)
        VALUES ($1) RETURNING *`;
    const data = (await client.query(sql, [customerName])).rows;
    await client.query('COMMIT');
    parentPort.postMessage(data);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    parentPort.postMessage([]);
  }
}

async function updateCustomerDB(id, customerName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `UPDATE customer SET CUSTOMERNAME=$1 WHERE id=$2 RETURNING *`;
    const data = (await client.query(sql, [customerName, id])).rows;
    await client.query('COMMIT');
    parentPort.postMessage(data);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    parentPort.postMessage([]);
  }
}

async function deleteCustomerDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = `DELETE FROM customer WHERE id=$1 RETURNING *`;
    const data = (await client.query(sql, [id])).rows;
    await client.query('COMMIT');
    parentPort.postMessage(data);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    parentPort.postMessage([]);
  }
}

module.exports = { getCustomerDB, getCustomerByIdDB, createCustomerDB, updateCustomerDB, deleteCustomerDB };
