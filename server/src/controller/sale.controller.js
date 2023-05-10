const express = require('express');
const { getSale, getSaleById, createSale, updateSale, deleteSale } = require('../service/sale.service');
const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const sale = await getSale();
    res.status(200).send(sale);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await getSaleById(id);
    res.status(200).send(sale);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/', async (req, res) => {
  try {
    const { product_ID, customer_ID, amount, cost } = req.body;
    const sale = await createSale(product_ID, customer_ID, amount, cost);
    res.status(200).send(sale);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_ID, customer_ID, amount, cost } = req.body;
    const sale = await updateSale(id, product_ID, customer_ID, amount, cost);
    res.status(200).send(sale);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await deleteSale(id);
    res.status(200).send(sale);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
