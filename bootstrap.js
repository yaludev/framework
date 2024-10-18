// framework/bootstrap.js
const container = require('./container');
const ActionServiceProvider = require('./providers/ActionServiceProvider');

function bootstrap() {
  const providers = [
    new ActionServiceProvider(container),
    // Add other service providers here
  ];

  // Register all providers
  providers.forEach((provider) => provider.register());

  // Optionally boot providers
  providers.forEach((provider) => {
    if (typeof provider.boot === 'function') {
      provider.boot();
    }
  });
}

module.exports = { container, bootstrap };
