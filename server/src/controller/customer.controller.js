const express = require('express');
const { getCustomer, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../service/customer.service');
const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const customer = await getCustomer();
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id);
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/', async (req, res) => {
  try {
    const { customername } = req.body;
    const customer = await createCustomer(customername);
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { customername } = req.body;
    const customer = await updateCustomer(id, customername);
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await deleteCustomer(id);
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
