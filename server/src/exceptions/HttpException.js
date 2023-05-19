class HttpException extends Error {
  constructor(status, obj) {
    super(obj.message);
    this.status = status;
    this.message = obj.message;
    this.id = obj.id;
  }
}

module.exports = { HttpException };
