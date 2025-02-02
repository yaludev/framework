class DriverManager {
    constructor() {
      this.drivers = {};
    }
  
    /**
     * Register a new driver.
     * @param {string} name - The driver name.
     * @param {function} driverClass - The driver class.
     */
    registerDriver(name, driverClass) {
      this.drivers[name] = driverClass;
    }
  
    /**
     * Create an instance of the specified driver.
     * @param {string} name - The driver name.
     * @param {object} options - The driver options.
     * @returns {EventDriverInterface}
     */
    createDriver(name, options) {
      const DriverClass = this.drivers[name];
      if (!DriverClass) {
        throw new Error(`Event driver not found: ${name}`);
      }
      return new DriverClass(options);
    }
  }
  
  module.exports = DriverManager;
  