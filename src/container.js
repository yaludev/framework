// framework/container.js
class Container {
    constructor() {
      this.services = {};
    }
  
    bind(name, factory) {
      this.services[name] = factory;
    }
  
    singleton(name, factory) {
      const instance = factory();
      this.services[name] = () => instance;
    }
  
    resolve(name) {
      const factory = this.services[name];
  
      if (!factory) {
        throw new Error(`Service '${name}' not found.`);
      }
  
      return factory();
    }
  }
  
  module.exports = new Container();
