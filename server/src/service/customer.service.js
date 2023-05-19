const { CustomerDB } = require('../database/Classes/CustomerDB');

class CustomerService {
  customerDB = new CustomerDB()

  async getCustomers() {
    return await this.customerDB.getAll();
  }

  async getCustomerById(id) {
    return await this.customerDB.getById(id);
  }

  async createCustomer(customer) {
    return await this.customerDB.create(customer);
  }

  async updateCustomer(id, customer) {
    return await this.customerDB.updateById(id, customer);
  }

  async deleteCustomer(id) {
    return await this.customerDB.deleteById(id);
  }
}

module.exports = { CustomerService };
