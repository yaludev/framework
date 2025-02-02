
class EventManager {
    constructor(driver) {
      this.driver = driver;
    }
  
    async on(event, listener) {
      return this.driver.on(event, listener);
    }
  
    async emit(event, ...args) {
      return this.driver.emit(event, ...args);
    }
    async dispatch(event, ...args) {
        return this.driver.emit(event, ...args);
    }
  
    async off(event, listener) {
      return this.driver.off(event, listener);
    }
  }
  
  module.exports = EventManager;