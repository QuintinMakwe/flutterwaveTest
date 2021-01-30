class AppError extends Error {
    constructor(message,data, statusCode) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
      this.data = data
    }
  }
  
  module.exports = AppError;