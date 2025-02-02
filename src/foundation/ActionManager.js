class ActionManager {
    constructor() {
      this.actions = {};
    }
  
    register(name, middleware) {
      this.actions[name] = middleware;
    }
  
    get(name) {
      if (!this.actions[name]) {
        throw new Error(`Action '${name}' not found.`);
      }
      return this.actions[name];
    }
  }
  
  module.exports = ActionManager;
  