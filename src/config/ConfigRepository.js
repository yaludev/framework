
const ConfigRepositoryInterface = require('../interfaces/ConfigRepositoryInterface');

class ConfigRepository extends ConfigRepositoryInterface {
    constructor() {
      super();
      this.configurations = {};
    }
  
    get(key, defaultValue = null) {
      return this.configurations[key] || defaultValue;
    }
  
    set(key, value) {
      this.configurations[key] = value;
    }
  
    has(key) {
      return key in this.configurations;
    }
  
    all() {
      return { ...this.configurations };
    }
  }
  
  module.exports = ConfigRepository;