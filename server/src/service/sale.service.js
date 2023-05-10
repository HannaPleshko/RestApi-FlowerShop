const { getSaleDB, getSaleByIdDB, createSaleDB, updateSaleDB, deleteSaleDB } = require('../repository/sale.repository');

async function getSale() {
  const sale = await getSaleDB();
  if (!sale.length) throw new Error('sale DB is empty');
  return sale;
}

async function getSaleById(id) {
  const sale = await getSaleByIdDB(id);
  if (!sale.length) throw new Error('sale DB is empty');
  return sale;
}
async function createSale(product_ID, customer_ID, amount, cost) {
  const sale = await createSaleDB(product_ID, customer_ID, amount, cost);
  if (!sale.length) throw new Error('sale DB is empty');
  return sale;
}

async function updateSale(id, product_ID, customer_ID, amount, cost) {
  const sale = await updateSaleDB(id, product_ID, customer_ID, amount, cost);
  if (!sale.length) throw new Error('sale DB is empty');
  return sale;
}
async function deleteSale(id) {
  const sale = await deleteSaleDB(id);
  if (!sale.length) throw new Error('sale DB is empty');
  return sale;
}

module.exports = { getSale, getSaleById, createSale, updateSale, deleteSale };
