const { SaleDB } = require('../database/Classes/SaleDB');

class SaleService {
  saleDB = new SaleDB();

  async getSales() {
    return await this.saleDB.getAll();
  }

  async getSaleById(id) {
    return await this.saleDB.getById(id);
  }

  async createSale(sale) {
    return await this.saleDB.create(sale);
  }

  async updateSale(id, sale) {
    return await this.saleDB.updateById(id, sale);
  }

  async deleteSale(id) {
    return await this.saleDB.deleteById(id);
  }
}

module.exports = { SaleService };
