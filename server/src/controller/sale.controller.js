const { SaleService } = require('../service/sale.service');

class SaleController {
  saleService = new SaleService();

  getSales = async (req, res, next) => {
    try {
      res.status(200).send(await this.saleService.getSales());
    } catch (error) {
      next(error);
    }
  };

  getSaleById = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.saleService.getSaleById(id));
    } catch (error) {
      next(error);
    }
  };

  createSale = async (req, res, next) => {
    try {
      const sale = req.body;
      res.status(200).send(await this.saleService.createSale(sale));
    } catch (error) {
      next(error);
    }
  };

  updateSale = async (req, res, next) => {
    try {
      const { id } = req.params;
      const sale = req.body;
      res.status(200).send(await this.saleService.updateSale(id, sale));
    } catch (error) {
      next(error);
    }
  };

  deleteSale = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.saleService.deleteSale(id));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SaleController;
