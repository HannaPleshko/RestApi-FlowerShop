const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controller/products.controller');
const provider = require('./controller/provider.controller');
const customer = require('./controller/customer.controller');
const sale = require('./controller/sale.controller');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.json())

app.use('/product', products);
app.use('/provider', provider);
app.use('/customer', customer);
app.use('/sale', sale);

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = app;
