class EventDriverInterface {
    /**
     * Subscribe to an event.
     * @param {string} event - The event name.
     * @param {function} listener - The event listener.
     */
    on(event, listener) {
      throw new Error('Method not implemented.');
    }
  
    /**
     * Emit an event.
     * @param {string} event - The event name.
     * @param {...any} args - The event arguments.
     */
    emit(event, ...args) {
      throw new Error('Method not implemented.');
    }

  
  
    /**
     * Remove an event listener.
     * @param {string} event - The event name.
     * @param {function} listener - The event listener.
     */
    off(event, listener) {
      throw new Error('Method not implemented.');
    }
  }
  
  module.exports = EventDriverInterface;
  