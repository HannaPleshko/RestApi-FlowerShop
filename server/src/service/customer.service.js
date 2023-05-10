const { getCustomerDB, getCustomerByIdDB, createCustomerDB, updateCustomerDB, deleteCustomerDB } = require('../repository/customer.repository');

async function getCustomer() {
  const customer = await getCustomerDB();
  if (!customer.length) throw new Error('customer DB is empty');
  return customer;
}

async function getCustomerById(id) {
  const customer = await getCustomerByIdDB(id);
  if (!customer.length) throw new Error('customer DB is empty');
  return customer;
}

async function createCustomer(customerName) {
  const customer = await createCustomerDB(customerName);
  if (!customer.length) throw new Error('customer DB is empty');
  return customer;
}

async function updateCustomer(id, customerName) {
  const customer = await updateCustomerDB(id, customerName);
  if (!customer.length) throw new Error('customer DB is empty');
  return customer;
}

async function deleteCustomer(id) {
  const customer = await deleteCustomerDB(id);
  if (!customer.length) throw new Error('customer DB is empty');
  return customer;
}

module.exports = { getCustomer, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
