const { ProviderDB } = require('../database/Classes/ProviderDB');

class ProviderService {
  providerDB = new ProviderDB()

  async getProviders() {
    return await this.providerDB.getAll();
  }

  async getProviderById(id) {
    return await this.providerDB.getById(id);
  }

  async createProvider(provider) {
    return await this.providerDB.create(provider);
  }

  async updateProvider(id, provider) {
    return await this.providerDB.updateById(id, provider);
  }

  async deleteProvider(id) {
    return await this.providerDB.deleteById(id);
  }
}

module.exports = { ProviderService };
