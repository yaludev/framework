const MiddlewareManager = require('../foundation/MiddlewareManager');

const path = require('path');

class MiddlewareServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    // Ensure the middlewareManager is registered
    if (!this.app.bound('middlewareManager')) {
      this.app.singleton('middlewareManager', () => new MiddlewareManager());
    }
    console.log('MiddlewareServiceProvider registered');
  }

  boot() {
    const middlewareManager = this.app.make('middlewareManager');
    const config = this.app.make('config');
    const middlewareConfig = config.get('middleware');

    // Register named middleware
    if (middlewareConfig && middlewareConfig.named) {
      for (const [name, middlewarePath] of Object.entries(middlewareConfig.named)) {
        middlewareManager.register(name, () => {
          const resolvedPath = path.resolve(this.app.getPath(), middlewarePath);
          const MiddlewareFactory = require(resolvedPath);

          if (typeof MiddlewareFactory === 'function') {
            // Call the middleware factory with 'app' to get the middleware function
            const middlewareFunction = MiddlewareFactory(this.app);

            if (typeof middlewareFunction === 'function') {
              // Return the middleware function
              return middlewareFunction;
            } else {
              throw new Error(`Middleware '${name}' factory did not return a function.`);
            }
          } else {
            throw new Error(`Middleware '${name}' must export a function.`);
          }
        });
        console.log(`Registered middleware '${name}'`);
      }
    }

    // Store global middleware
    if (middlewareConfig && Array.isArray(middlewareConfig.global)) {
      this.app.instance('middleware.global', middlewareConfig.global);
      // console.log('Registered global middleware:', middlewareConfig.global);
    } else {
      // Ensure 'middleware.global' is bound even if empty
      this.app.instance('middleware.global', []);
    }

    console.log('MiddlewareServiceProvider booted');
  }
}

module.exports = MiddlewareServiceProvider;
