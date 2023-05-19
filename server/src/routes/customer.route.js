const { Router } = require('express');
const CustomerController = require('../controller/customer.controller');

class CustomerRoute {
  path = '/customer';

  router = Router();
  customerRoute = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.customerRoute.getCustomers);
    this.router.get(`${this.path}/:id`, this.customerRoute.getCustomerById);
    this.router.post(`${this.path}`, this.customerRoute.createCustomer);
    this.router.put(`${this.path}/:id`, this.customerRoute.updateCustomer);
    this.router.delete(`${this.path}/:id`, this.customerRoute.deleteCustomer);
  }
}

module.exports = CustomerRoute;
