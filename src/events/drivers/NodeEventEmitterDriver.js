
const { EventEmitter } = require('events');
const EventDriverInterface = require('../../interfaces/EventDriverInterface');

class NodeEventEmitterDriver extends EventDriverInterface {
  constructor() {
    super();
    this.emitter = new EventEmitter();
  }

  on(event, listener) {
    this.emitter.on(event, listener);
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  off(event, listener) {
    this.emitter.removeListener(event, listener);
  }
}

module.exports = NodeEventEmitterDriver;
