const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../service/products.service');
const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getProductById(id);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/', async (req, res) => {
  try {
    const { providerId, price, productName } = req.body;
    const products = await createProduct(providerId, price, productName);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { providerId, price, productName } = req.body;
    const products = await updateProduct(id, providerId, price, productName);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
