const { Router } = require('express');
const ProviderController = require('../controller/provider.controller');

class ProviderRoute {
  path = '/provider';

  router = Router();
  providerRoute = new ProviderController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.providerRoute.getProviders);
    this.router.get(`${this.path}/:id`, this.providerRoute.getProviderById);
    this.router.post(`${this.path}`, this.providerRoute.createProvider);
    this.router.put(`${this.path}/:id`, this.providerRoute.updateProvider);
    this.router.delete(`${this.path}/:id`, this.providerRoute.deleteProvider);
  }
}

module.exports = ProviderRoute;
