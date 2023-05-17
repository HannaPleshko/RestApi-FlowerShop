const { getCustomerDB, getCustomerByIdDB, createCustomerDB, updateCustomerDB, deleteCustomerDB } = require('../repository/customer.repository');

async function getCustomer() {
  const customer = await getCustomerDB();
  return customer;
}

async function getCustomerById(id) {
  const customer = await getCustomerByIdDB(id);
  return customer;
}

async function createCustomer(customername) {
  const customer = await createCustomerDB(customername);
  return customer;
}

async function updateCustomer(id, customername) {
  const customer = await updateCustomerDB(id, customername);
  return customer;
}

async function deleteCustomer(id) {
  const customer = await deleteCustomerDB(id);
  return customer;
}

module.exports = { getCustomer, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
