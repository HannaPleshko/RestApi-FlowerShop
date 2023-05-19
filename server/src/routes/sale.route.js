const { Router } = require('express');
const SaleController = require('../controller/sale.controller');

class SaleRoute {
  path = '/sale';

  router = Router();
  saleRoute = new SaleController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.saleRoute.getSales);
    this.router.get(`${this.path}/:id`, this.saleRoute.getSaleById);
    this.router.post(`${this.path}`, this.saleRoute.createSale);
    this.router.put(`${this.path}/:id`, this.saleRoute.updateSale);
    this.router.delete(`${this.path}/:id`, this.saleRoute.deleteSale);
  }
}

module.exports = SaleRoute;
