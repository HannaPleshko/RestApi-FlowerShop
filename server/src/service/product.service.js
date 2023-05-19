const { ProductDB } = require('../database/Classes/ProductDB');

class ProductService {
  productDB = new ProductDB()

  async getProducts() {
    return await this.productDB.getAll();
  }

  async getProductById(id) {
    return await this.productDB.getById(id);
  }

  async createProduct(product) {
    return await this.productDB.create(product);
  }

  async updateProduct(id, product) {
    return await this.productDB.updateById(id, product);
  }

  async deleteProduct(id) {
    return await this.productDB.deleteById(id);
  }
}

module.exports = { ProductService };
