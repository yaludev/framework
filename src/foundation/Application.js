const path = require('node:path');

class Application {
    constructor(basePath) {
      this.basePath = basePath || process.cwd();
      this.bindings = new Map();
      this.instances = new Map();

    }
  
    getPath(relativePath = '') {
      return path.join(this.basePath, relativePath);
    }
  
    bind(key, resolver) {
      this.bindings.set(key, resolver);
    }
  
    singleton(key, resolver) {
      this.bindings.set(key, () => {
        if (!this.instances.has(key)) {
          this.instances.set(key, resolver());
        }
        return this.instances.get(key);
      });
    }
  
    instance(key, instance) {
      this.instances.set(key, instance);
    }
    bound(key) {
        return this.bindings.has(key) || this.instances.has(key);
    }
  
    make(key) {
      if (this.instances.has(key)) {
        return this.instances.get(key);
      }
  
      if (this.bindings.has(key)) {
        const resolver = this.bindings.get(key);
        const instance = resolver();
        this.instances.set(key, instance);
        return instance;
      }
  
      throw new Error(`Service '${key}' is not bound in the container.`);
    }
  }
  
  module.exports = Application;
  