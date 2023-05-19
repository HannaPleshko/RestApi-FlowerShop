const { defaultPool } = require('../connection');
const { HttpException } = require('../../exceptions/HttpException');
const { ExceptionType } = require('../../exceptions/exceptions.type');
const createTables = async (pool = defaultPool) => {
  try {
    const client = await pool.connect();
    await client.query('BEGIN');

    await client
      .query(
        ` 
      CREATE TABLE IF NOT EXISTS PROVIDER ( 
        ID UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID PRIMARY KEY, 
        ProviderName varchar(50) 
      ); 

      CREATE TABLE IF NOT EXISTS PRODUCT ( 
        ID UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID PRIMARY KEY, 
        Provider_ID UUID, 
        Price int, 
        ProductName varchar(50), 
        FOREIGN KEY (provider_id) REFERENCES provider(id) ON DELETE CASCADE 
      ); 

      CREATE TABLE IF NOT EXISTS CUSTOMER ( 
        ID UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID PRIMARY KEY, 
        CustomerName varchar(50) 
      );

      CREATE TABLE IF NOT EXISTS SALE ( 
        ID UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID PRIMARY KEY, 
        Product_ID UUID, 
        Customer_ID UUID, 
        Amount int, 
        Cost int, 
        
        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE, 
        FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE 
      ); 
      `,
      )
      .catch(error => {
        if (error) {
          console.log(error);
          throw new HttpException(500, ExceptionType.DB_INITIALIZE_NOT_INITIALIZED);
        }
      });

    await client.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');

    if (error instanceof HttpException) throw error;

    throw new HttpException(500, ExceptionType.DB_INITIALIZE_NOT_CONNECTED);
  }
};
module.exports = { createTables };
