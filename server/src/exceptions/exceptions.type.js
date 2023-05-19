const ExceptionType = {
  DB_INITIALIZE_NOT_INITIALIZED: { id: 1, message: 'DB not initialized.' },
  DB_INITIALIZE_NOT_CONNECTED: { id: 2, message: 'DB not connected.' },

  DB_CUSTOMER_CREATE_NOT_CREATED: { id: 9, message: 'DB not created customer.' },
  DB_CUSTOMER_GET_ALL_NOT_GOT: { id: 10, message: 'DB not got customers.' },
  DB_CUSTOMER_GET_BY_ID_NOT_GOT: { id: 11, message: 'DB not got customer/-s.' },
  DB_CUSTOMER_DELETE_NOT_DELETED: { id: 12, message: 'DB not deleted customer.' },
  DB_CUSTOMER_UPDATE_NOT_UPDETED: { id: 13, message: 'DB not updated customer.' },
  DB_CUSTOMER_NOT_FOUND: { id: 14, message: 'DB not found customer.' },

  DB_PROVIDER_CREATE_NOT_CREATED: { id: 15, message: 'DB not created provider.' },
  DB_PROVIDER_GET_ALL_NOT_GOT: { id: 16, message: 'DB not got providers.' },
  DB_PROVIDER_GET_BY_ID_NOT_GOT: { id: 17, message: 'DB not got provider/-s.' },
  DB_PROVIDER_DELETE_NOT_DELETED: { id: 18, message: 'DB not deleted provider.' },
  DB_PROVIDER_UPDATE_NOT_UPDETED: { id: 19, message: 'DB not updated provider.' },
  DB_PROVIDER_NOT_FOUND: { id: 20, message: 'DB not found provider.' },

  DB_PRODUCT_CREATE_NOT_CREATED: { id: 21, message: 'DB not created product.' },
  DB_PRODUCT_GET_ALL_NOT_GOT: { id: 22, message: 'DB not got products.' },
  DB_PRODUCT_GET_BY_ID_NOT_GOT: { id: 23, message: 'DB not got product/-s.' },
  DB_PRODUCT_DELETE_NOT_DELETED: { id: 24, message: 'DB not deleted product.' },
  DB_PRODUCT_UPDATE_NOT_UPDETED: { id: 25, message: 'DB not updated product.' },
  DB_PRODUCT_NOT_FOUND: { id: 26, message: 'DB not found product.' },

  DB_SALE_CREATE_NOT_CREATED: { id: 27, message: 'DB not created sale.' },
  DB_SALE_GET_ALL_NOT_GOT: { id: 28, message: 'DB not got sales.' },
  DB_SALE_GET_BY_ID_NOT_GOT: { id: 29, message: 'DB not got sale/-s.' },
  DB_SALE_DELETE_NOT_DELETED: { id: 30, message: 'DB not deleted sale.' },
  DB_SALE_UPDATE_NOT_UPDETED: { id: 31, message: 'DB not updated sale.' },
  DB_SALE_NOT_FOUND: { id: 32, message: 'DB not found sale.' },
};

module.exports = { ExceptionType };
