const { ProviderService } = require('../service/provider.service');

class ProviderController {
  providerService = new ProviderService();

  getProviders = async (req, res, next) => {
    try {
      res.status(200).send(await this.providerService.getProviders());
    } catch (error) {
      next(error);
    }
  };

  getProviderById = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.providerService.getProviderById(id));
    } catch (error) {
      next(error);
    }
  };

  createProvider = async (req, res, next) => {
    try {
      const provider = req.body;
      res.status(200).send(await this.providerService.createProvider(provider));
    } catch (error) {
      next(error);
    }
  };

  updateProvider = async (req, res, next) => {
    try {
      const { id } = req.params;
      const provider = req.body;
      res.status(200).send(await this.providerService.updateProvider(id, provider));
    } catch (error) {
      next(error);
    }
  };

  deleteProvider = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.providerService.deleteProvider(id));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProviderController;
