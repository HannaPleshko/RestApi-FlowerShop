const { Database } = require('..');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');

class SaleDB extends Database {
  async create(sale) {
    try {
      await this.pool.query('BEGIN');

      const { product_id, customer_id, amount, cost } = sale;

      const query = {
        text: 'INSERT INTO Sale (Product_ID, Customer_ID, Amount, Cost) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [product_id, customer_id, amount, cost],
      };

      const createdSale = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return createdSale;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SALE_CREATE_NOT_CREATED);
    }
  }

  async getAll() {
    try {
      const query = { text: 'SELECT * FROM Sale ORDER BY id' };

      const { fields, rows } = await this.pool.query(query);
      if (!rows.length) throw new HttpException(404, ExceptionType.DB_SALE_NOT_FOUND);

      return {
        fields: fields.map(field => field.name),
        rows,
      };
    } catch (error) {
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SALE_GET_ALL_NOT_GOT);
    }
  }

  async getById(id) {
    try {
      const query = {
        text: 'SELECT * FROM Sale WHERE id = $1',
        values: [id],
      };

      const gotSale = (await this.pool.query(query)).rows;
      if (!gotSale.length) throw new HttpException(404, ExceptionType.DB_SALE_NOT_FOUND);

      return gotSale;
    } catch (error) {
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SALE_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(id) {
    try {
      await this.pool.query('BEGIN');

      const query = {
        text: 'DELETE FROM Sale WHERE id = $1 RETURNING *',
        values: [id],
      };

      const deletedSale = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return deletedSale;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SALE_DELETE_NOT_DELETED);
    }
  }

  async updateById(id, sale) {
    try {
      await this.pool.query('BEGIN');

      const { product_id, customer_id, amount, cost } = sale;

      const query = {
        text: `UPDATE Sale SET Product_ID = $1, Customer_ID = $2, Amount=$3, Cost = $4 WHERE ID = $5 RETURNING *`,
        values: [product_id, customer_id, amount, cost, id],
      };

      const updatedSale = (await this.pool.query(query)).rows;

      await this.pool.query('COMMIT');

      return updatedSale;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SALE_UPDATE_NOT_UPDETED);
    }
  }
}

module.exports = { SaleDB };
