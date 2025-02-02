const express = require('express');
const path = require('path');

class RouteServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    // No bindings needed here
  }

  async boot() {
    console.log('Starting RouteServiceProvider boot method');

    const middleware = this.app.make('middleware');
    const config = this.app.make('config');
    const filesystem = this.app.make('filesystem');
    const disk = filesystem.disk('local');

    const moduleFolder = config.get('app.moduleFolder', 'apps');
    const basePath = this.app.getPath();
    const http = this.app.make('http');

    try {
      const entries = await disk.list(moduleFolder);

      for (const entry of entries) {
        await this.loadModuleRoutes(entry, {
          moduleFolder,
          basePath,
          disk,
          http,
          middleware,
        });
      }
    } catch (err) {
      console.error(`Failed to load routes from modules directory '${moduleFolder}':`, err);
    }

    console.log('RouteServiceProvider boot completed');
  }

  async loadModuleRoutes(entry, { moduleFolder, basePath, disk, http, middleware }) {
    const modulePath = path.join(moduleFolder, entry);
    const isDirectory = await disk.isDirectory(modulePath);

    if (!isDirectory) {
      return;
    }

    const routeFilePath = path.join(modulePath, 'routes.js');
    const routeAbsolutePath = path.resolve(basePath, routeFilePath);

    const routeExists = await disk.exists(routeFilePath);

    if (!routeExists) {
      console.warn(`No routes.js found for module '${entry}'`);
      return;
    }

    console.log(`Loading routes from '${routeAbsolutePath}'`);

    let routeModule;
    try {
      routeModule = require(routeAbsolutePath);
    } catch (requireError) {
      console.error(`Failed to require routes.js for module '${entry}':`, requireError);
      return;
    }

    if (typeof routeModule !== 'function') {
      console.warn(`The routes.js in module '${entry}' does not export a function.`);
      return;
    }

    try {
      const router = this.app.make('router');
      // const router = express.Router();

      // Pass the router and middleware to the module
      routeModule(http,router, middleware);


      console.info(`Loaded routes for module '${entry}' at path '/${entry}'`);
    } catch (error) {
      console.error(`Failed to load routes for module '${entry}':`, error);
    }
  }
}

module.exports = RouteServiceProvider;
