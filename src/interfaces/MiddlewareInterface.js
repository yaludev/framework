class MiddlewareInterface {
    handle(req, res, next) {
      throw new Error('Middleware must implement handle method');
    }
  }
  
  module.exports = MiddlewareInterface;
  