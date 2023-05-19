const { defaultPool } = require('../connection');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');

const dropTables = async (pool = defaultPool) => {
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        await client
            .query(
                `
         DROP TABLE IF EXISTS PROVIDER CASCADE;
          
         DROP TABLE IF EXISTS PRODUCT CASCADE; 
          
         DROP TABLE IF EXISTS CUSTOMER CASCADE;
          
         DROP TABLE IF EXISTS SALE CASCADE;
`,
            )
            
        await client.query('COMMIT');
    } catch (error) {
        await pool.query('ROLLBACK');

        if (error instanceof HttpException) throw error;
        throw new HttpException(500, ExceptionType.DB_INITIALIZE_NOT_CONNECTED);
    }
};

module.exports = { dropTables }