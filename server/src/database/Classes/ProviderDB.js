const { Database } = require('..');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');

class ProviderDB extends Database {
    async create(provider) {
        try {
            await this.pool.query('BEGIN');

            const { providername } = provider;

            const query = {
                text: 'INSERT INTO Provider (ProviderName) VALUES ($1) RETURNING *',
                values: [providername],
            };

            const createdProvider = (await this.pool.query(query)).rows;
            await this.pool.query('COMMIT');

            return createdProvider;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PROVIDER_CREATE_NOT_CREATED);
        }
    }

    async getAll() {
        try {
            const query = { text: 'SELECT * FROM Provider ORDER BY id' };

            const { fields, rows } = await this.pool.query(query);
            if (!rows.length) throw new HttpException(404, ExceptionType.DB_PROVIDER_NOT_FOUND);

            return {
                fields: fields.map(field => field.name),
                rows
            };
        } catch (error) {
            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PROVIDER_GET_ALL_NOT_GOT);
        }
    }

    async getById(id) {
        try {
            const query = {
                text: 'SELECT * FROM Provider WHERE id = $1',
                values: [id],
            };

            const gotProvider = (await this.pool.query(query)).rows;
            if (!gotProvider.length) throw new HttpException(404, ExceptionType.DB_PROVIDER_NOT_FOUND);

            return gotProvider;
        } catch (error) {
            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PROVIDER_GET_BY_ID_NOT_GOT);
        }
    }

    async deleteById(id) {
        try {
            await this.pool.query('BEGIN');

            const query = {
                text: 'DELETE FROM Provider WHERE id = $1 RETURNING *',
                values: [id],
            };

            const deletedProvider = (await this.pool.query(query)).rows;
            await this.pool.query('COMMIT');

            return deletedProvider;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PROVIDER_DELETE_NOT_DELETED);
        }
    }

    async updateById(id, provider) {
        try {
            await this.pool.query('BEGIN');

            const { providername } = provider;

            const query = {
                text: `UPDATE Provider SET ProviderName = $1 WHERE id = $2 RETURNING *`,
                values: [providername, id],
            };

            const updatedProvider = (await this.pool.query(query)).rows;

            await this.pool.query('COMMIT');

            return updatedProvider;
        } catch (error) {
            await this.pool.query('ROLLBACK');

            console.error(`Message: ${error.message}. Detail: ${error.detail}`);

            throw new HttpException(500, ExceptionType.DB_PROVIDER_UPDATE_NOT_UPDETED);
        }
    }
}

module.exports = { ProviderDB }