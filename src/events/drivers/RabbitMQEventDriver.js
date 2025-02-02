const amqp = require('amqplib');
const EventDriverInterface = require('../../interfaces/EventDriverInterface');

class RabbitMQEventDriver extends EventDriverInterface {
  constructor(options) {
    super();
    this.options = options;
    this.connection = null;
    this.channel = null;
    this.listeners = {};
  }

  async connect() {
    this.connection = await amqp.connect(this.options.url);
    this.channel = await this.connection.createChannel();
  }

  async on(event, listener) {
    if (!this.channel) {
      await this.connect();
    }

    await this.channel.assertExchange(event, 'fanout', { durable: false });
    const q = await this.channel.assertQueue('', { exclusive: true });
    await this.channel.bindQueue(q.queue, event, '');

    this.channel.consume(q.queue, (msg) => {
      listener(...JSON.parse(msg.content.toString()));
    }, { noAck: true });

    this.listeners[event] = listener;
  }

  async emit(event, ...args) {
    if (!this.channel) {
      await this.connect();
    }

    await this.channel.assertExchange(event, 'fanout', { durable: false });
    this.channel.publish(event, '', Buffer.from(JSON.stringify(args)));
  }

  async off(event) {
    // RabbitMQ doesn't support removing a listener directly.
    // In practice, you'd need to manage consumers manually.
    console.warn('Removing listeners is not directly supported in this driver.');
  }
}

module.exports = RabbitMQEventDriver;
