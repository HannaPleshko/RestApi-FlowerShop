const { Router } = require('express');
const ProductController = require('../controller/product.controller');

class ProductRoute {
  path = '/product';

  router = Router();
  productRoute = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.productRoute.getProducts);
    this.router.get(`${this.path}/:id`, this.productRoute.getProductById);
    this.router.post(`${this.path}`, this.productRoute.createProduct);
    this.router.put(`${this.path}/:id`, this.productRoute.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productRoute.deleteProduct);
  }
}

module.exports = ProductRoute;
