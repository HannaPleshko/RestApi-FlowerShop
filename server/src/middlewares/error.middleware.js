const errorMiddleware = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const id = error.id || 0;

    res.status(status).send({ id, message });
  } catch (error) {
    next(error);
  }
};

module.exports = { errorMiddleware };
