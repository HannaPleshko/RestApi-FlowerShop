const { CustomerService } = require('../service/customer.service');

class CustomerController {
  customerService = new CustomerService();

  getCustomers = async (req, res, next) => {
    try {
      res.status(200).send(await this.customerService.getCustomers());
    } catch (error) {
      next(error);
    }
  };

  getCustomerById = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.customerService.getCustomerById(id));
    } catch (error) {
      next(error);
    }
  };

  createCustomer = async (req, res, next) => {
    try {
      const customer = req.body;
      res.status(200).send(await this.customerService.createCustomer(customer));
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = req.body;
      res.status(200).send(await this.customerService.updateCustomer(id, customer));
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.customerService.createCustomer(id));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CustomerController;
