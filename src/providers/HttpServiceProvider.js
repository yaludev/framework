// src/providers/HttpServiceProvider.js

const express = require('express');
const morgan = require('morgan');

class HttpServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    // Bind the Express application and router to the container
    this.app.singleton('http', () => express());
    this.app.singleton('router', () => express.Router());

    // Bind the middleware function to retrieve middleware by name
    this.app.singleton('middleware', () => {
      const middlewareManager = this.app.make('middlewareManager');
      return (name) => {
        const middlewareFunction = middlewareManager.get(name);



        if (typeof middlewareFunction === 'function') {
          // Middleware is a function, use it directly
          // console.log(`middlewareFunction htt '${middlewareFunction}'`);

          return middlewareFunction();
        } else {
          throw new Error(`Middleware '${name}' is not a valid middleware function.`);
        }
      };
    });

    console.log('HttpServiceProvider registered');
  }

  boot() {
    const http = this.app.make('http');
    const router = this.app.make('router');
    const middleware = this.app.make('middleware');
    const globalMiddleware = this.app.make('middleware.global') || [];

    //register login middleware
    http.use(morgan("dev"));

    // Apply global middleware
    globalMiddleware.forEach((middlewareName) => {
      http.use(middleware(middlewareName));
    });

    // Use the router in the Express application
    http.use(router);


    console.log('HttpServiceProvider booted');
  }
}

module.exports = HttpServiceProvider;
