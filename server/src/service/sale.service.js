const { getSaleDB, getSaleByIdDB, createSaleDB, updateSaleDB, deleteSaleDB } = require('../repository/sale.repository');

async function getSale() {
  const sale = await getSaleDB();
  return sale;
}

async function getSaleById(id) {
  const sale = await getSaleByIdDB(id);
  return sale;
}

async function createSale(product_id, customer_id, amount, cost) {
  const sale = await createSaleDB(product_id, customer_id, amount, cost);
  return sale;
}

async function updateSale(id, product_id, customer_id, amount, cost) {
  const sale = await updateSaleDB(id, product_id, customer_id, amount, cost);
  return sale;
}

async function deleteSale(id) {
  const sale = await deleteSaleDB(id);
  return sale;
}

module.exports = { getSale, getSaleById, createSale, updateSale, deleteSale };
