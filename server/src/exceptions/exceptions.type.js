const ExceptionType = {
  DB_INITIALIZE_NOT_INITIALIZED: { id: 1, message: 'DB not initialized.' },
  DB_INITIALIZE_NOT_CONNECTED: { id: 2, message: 'DB not connected.' },

  DB_CUSTOMER_CREATE_NOT_CREATED: { id: 9, message: 'DB not created customers.' },
  DB_CUSTOMER_GET_ALL_NOT_GOT: { id: 10, message: 'DB not got customers.' },
  DB_CUSTOMER_GET_BY_ID_NOT_GOT: { id: 11, message: 'DB not got customer/-s.' },
  DB_CUSTOMER_DELETE_NOT_DELETED: { id: 12, message: 'DB not deleted customer.' },
  DB_CUSTOMER_UPDATE_NOT_UPDETED: { id: 13, message: 'DB not updated customer.' },
  DB_CUSTOMER_NOT_FOUND: { id: 14, message: 'DB not found customer.' },

  DB_PROVIDER_CREATE_NOT_CREATED: { id: 9, message: 'DB not created customers.' },
  DB_PROVIDER_GET_ALL_NOT_GOT: { id: 10, message: 'DB not got customers.' },
  DB_PROVIDER_GET_BY_ID_NOT_GOT: { id: 11, message: 'DB not got customer/-s.' },
  DB_PROVIDER_DELETE_NOT_DELETED: { id: 12, message: 'DB not deleted customer.' },
  DB_PROVIDER_UPDATE_NOT_UPDETED: { id: 13, message: 'DB not updated customer.' },
  DB_PROVIDER_NOT_FOUND: { id: 14, message: 'DB not found customer.' },
};

module.exports = { ExceptionType }
