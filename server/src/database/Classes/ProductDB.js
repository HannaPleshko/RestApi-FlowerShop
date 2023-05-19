const { Database } = require('..');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');

class ProductDB extends Database {
    async create(product) {
        try {
            await this.pool.query('BEGIN');

            const { provider_id, price, productname } = product;

            const query = {
                text: 'INSERT INTO Product (Provider_ID, Price, ProductName) VALUES ($1,$2,$3) RETURNING *',
                values: [provider_id, price, productname],
            };

            const createdProduct = (await this.pool.query(query)).rows;
            await this.pool.query('COMMIT');

            return createdProduct;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PRODUCT_CREATE_NOT_CREATED);
        }
    }

    async getAll() {
        try {
            const query = { text: 'SELECT * FROM Product ORDER BY id' };

            const { fields, rows } = await this.pool.query(query);
            if (!rows.length) throw new HttpException(404, ExceptionType.DB_PRODUCT_NOT_FOUND);

            return {
                fields: fields.map(field => field.name),
                rows
            };
        } catch (error) {
            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PRODUCT_GET_ALL_NOT_GOT);
        }
    }

    async getById(id) {
        try {
            const query = {
                text: 'SELECT * FROM Product WHERE id = $1',
                values: [id],
            };

            const gotProduct = (await this.pool.query(query)).rows;
            if (!gotProduct.length) throw new HttpException(404, ExceptionType.DB_PRODUCT_NOT_FOUND);

            return gotProduct;
        } catch (error) {
            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PRODUCT_GET_BY_ID_NOT_GOT);
        }
    }

    async deleteById(id) {
        try {
            await this.pool.query('BEGIN');

            const query = {
                text: 'DELETE FROM Product WHERE id = $1 RETURNING *',
                values: [id],
            };

            const deletedProduct = (await this.pool.query(query)).rows;
            await this.pool.query('COMMIT');

            return deletedProduct;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PRODUCT_DELETE_NOT_DELETED);
        }
    }

    async updateById(id, product) {
        try {
            await this.pool.query('BEGIN');

            const { provider_id, price, productname } = product;

            const query = {
                text: `UPDATE Product SET Provider_ID = $1, Price = $2, ProductName = $3 WHERE ID = $4 RETURNING *`,
                values: [provider_id, price, productname, id],
            };

            const updatedProduct = (await this.pool.query(query)).rows;

            await this.pool.query('COMMIT');

            return updatedProduct;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PRODUCT_UPDATE_NOT_UPDETED);
        }
    }
}

module.exports = { ProductDB }