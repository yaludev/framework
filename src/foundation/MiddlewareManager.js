class MiddlewareManager {
    constructor() {
      this.middlewares = {};
    }
  
    register(name, middleware) {
      this.middlewares[name] = middleware;
    }
  
    get(name) {
      if (!this.middlewares[name]) {
        throw new Error(`Middleware '${name}' not found.`);
      }
      return this.middlewares[name];
    }
  }
  
  module.exports = MiddlewareManager;
  