const { Database } = require('..');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');

class CustomerDB extends Database {
  async create(customer) {
    try {
      await this.pool.query('BEGIN');

      const { customername } = customer;

      const query = {
        text: 'INSERT INTO Customer (CustomerName) VALUES ($1) RETURNING *',
        values: [customername],
      };

      const createdCustomer = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return createdCustomer;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_CUSTOMER_CREATE_NOT_CREATED);
    }
  }

  async getAll() {
    try {
      const query = { text: 'SELECT * FROM Customer ORDER BY id' };

      const { fields, rows } = await this.pool.query(query);

      return {
        fields: fields.map(field => field.name),
        rows,
      };
    } catch (error) {
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_CUSTOMER_GET_ALL_NOT_GOT);
    }
  }

  async getById(id) {
    try {
      const query = {
        text: 'SELECT * FROM Customer WHERE id = $1',
        values: [id],
      };

      const gotCustomer = (await this.pool.query(query)).rows;
      if (!gotCustomer.length) throw new HttpException(404, ExceptionType.DB_CUSTOMER_NOT_FOUND);

      return gotCustomer;
    } catch (error) {
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_CUSTOMER_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(id) {
    try {
      await this.pool.query('BEGIN');

      const query = {
        text: 'DELETE FROM Customer WHERE id = $1 RETURNING *',
        values: [id],
      };

      const deletedCustomer = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return deletedCustomer;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_CUSTOMER_DELETE_NOT_DELETED);
    }
  }

  async updateById(id, customer) {
    try {
      await this.pool.query('BEGIN');

      const { customername } = customer;

      const query = {
        text: `UPDATE Customer SET CustomerName = $1 WHERE id = $2 RETURNING *`,
        values: [customername, id],
      };

      const updatedCustomer = (await this.pool.query(query)).rows;

      await this.pool.query('COMMIT');

      return updatedCustomer;
    } catch (error) {
      await this.pool.query('ROLLBACK');

      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_CUSTOMER_UPDATE_NOT_UPDETED);
    }
  }
}

module.exports = { CustomerDB };
