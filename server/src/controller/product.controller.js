const { ProductService } = require('../service/product.service');

class ProductController {
  productService = new ProductService();

  getProducts = async (req, res, next) => {
    try {
      res.status(200).send(await this.productService.getProducts());
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.productService.geProductById(id));
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const product = req.body;
      res.status(200).send(await this.productService.createProduct(product));
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = req.body;
      res.status(200).send(await this.productService.updateProduct(id, product));
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).send(await this.productService.deleteProduct(id));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProductController;
