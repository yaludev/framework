const EventManager = require('../events/EventManager');
const DriverManager = require('../events/DriverManager');

class EventServiceProvider {
  constructor(app) {
    this.app = app;
    this.driverManager = new DriverManager();
  }

  register() {
    // Register default drivers
    this.registerDefaultDrivers();

    // Register extended drivers
    this.registerExtendedDrivers();

    this.app.singleton('events', () => {
      const config = this.app.make('config').get('events', {});
      const driverName = config.driver || 'emitter';
      const driverOptions = config[driverName] || {};

      const driver = this.driverManager.createDriver(driverName, driverOptions);

      return new EventManager(driver);
    });
  }

  boot() {
    // Register event listeners
    const events = this.app.make('events');
    const eventListeners = this.app.make('config').get('eventListeners', {});

    for (const [event, listeners] of Object.entries(eventListeners)) {
      listeners.forEach((listenerPath) => {
        const ListenerClass = require(listenerPath);
        const listenerInstance = new ListenerClass();
        events.on(event, listenerInstance.handle.bind(listenerInstance));
      });
    }
  }

  registerDefaultDrivers() {
    // Register built-in drivers
    const NodeEventEmitterDriver = require('../events/drivers/NodeEventEmitterDriver');
    const RabbitMQEventDriver = require('../events/drivers/RabbitMQEventDriver');

    this.driverManager.registerDriver('emitter', NodeEventEmitterDriver);
    this.driverManager.registerDriver('rabbitmq', RabbitMQEventDriver);
    // Additional built-in drivers can be registered here
  }

  /**
   * Allows external code to register new drivers.
   * @param {string} name - The driver name.
   * @param {function} driverClass - The driver class.
   */
  static extend(name, driverClass) {
    if (!this.extendedDrivers) {
      this.extendedDrivers = {};
    }
    this.extendedDrivers[name] = driverClass;
  }

  /**
   * Register extended drivers during provider registration.
   */
  registerExtendedDrivers() {
    if (EventServiceProvider.extendedDrivers) {
      for (const [name, driverClass] of Object.entries(EventServiceProvider.extendedDrivers)) {
        this.driverManager.registerDriver(name, driverClass);
      }
    }
  }
}

module.exports = EventServiceProvider;
