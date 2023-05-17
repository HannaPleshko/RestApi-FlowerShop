const express = require('express');
const { getProvider, getProviderById, createProvider, updateProvider, deleteProvider } = require('../service/provider.service');
const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const provider = await getProvider();
    res.status(200).send(provider);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await getProviderById(id);
    res.status(200).send(provider);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/', async (req, res) => {
  try {
    const { providername } = req.body;
    const provider = await createProvider(providername);
    res.status(200).send(provider);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { providername } = req.body;
    const provider = await updateProvider(id, providername);
    res.status(200).send(provider);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await deleteProvider(id);
    res.status(200).send(provider);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
