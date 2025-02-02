const { validationException } = require("../../imo-api/exceptions");
const container = require("./container");
const {
  ConfigServiceProvider,
  HttpServiceProvider,
  FilesystemServiceProvider,
  MiddlewareServiceProvider,
  RouteServiceProvider
} = require("./providers");
const Application = require("./foundation/Application");

const moduleAlias = require("module-alias");
const path = require("path");
const EventServiceProvider = require("./providers/EventServiceProvider");
const ActionServiceProvider = require("./providers/ActionServiceProvider");

let app = null;
async function bootstrap(config = {}) {


  app = new Application(config.basePath || path.resolve("src"));


  // // Bind initial configuration to the container
  app.instance("config.initial", config);

  // Configure the module alias
  moduleAlias.addAlias("@", path.resolve(config.basePath));




  const coreProviders = [
    new ConfigServiceProvider(app),
    new FilesystemServiceProvider(app),
    new EventServiceProvider(app),
    new ActionServiceProvider(app),
    new MiddlewareServiceProvider(app),
    new HttpServiceProvider(app),
    new RouteServiceProvider(app),

    // Other providers...
  ];

  // Register core services before loading module providers
  coreProviders.forEach((provider) => provider.register());

  // Load module-wise providers
  const moduleProviders = await loadModuleProviders(app);

  // Combine core and module providers
  const providers = [...coreProviders, ...moduleProviders];


  // Register services
  providers.forEach((provider) => provider.register());

  global.app = app;

  // const router = app.make("router");
  // Boot services
  for (const provider of providers) {
    if (typeof provider.boot === "function") {
      await provider.boot();
    }
  }



  const http = app.make("http");

  // console.log({ router });

  // Return the Express.js server instance
  return app;
}


async function loadModuleProviders(app) {



  const config = app.make('config');
  const moduleFolder = config.get('app.moduleFolder', 'apps');
  const basePath = app.getPath();
  const modulesPath = moduleFolder; //path.join(basePath, moduleFolder);
  const moduleProviders = [];

  const filesystem = app.make('filesystem');
  const disk = filesystem.disk();


  try {
    const moduleDirs = await disk.list(moduleFolder);



    for (const moduleDir of moduleDirs) {
      const modulePath = path.join(modulesPath, moduleDir);
      const isDirectory = await disk.isDirectory(modulePath);
      console.log({modulePath,moduleDir,isDirectory})

      if (isDirectory) {
        const providersPath = path.join(modulePath, 'providers');

        try {
          const providerFiles = await disk.list(providersPath);
          console.log({providerFiles})
          for (const file of providerFiles) {
            if (file.endsWith('.js')) {
              const filePath = path.join(providersPath,file)
              const absolutePath = path.join(basePath, filePath);
              const providerClass = require(absolutePath);
              const providerInstance = new providerClass(app);
              moduleProviders.push(providerInstance);
            }
          }
        } catch (err) {
          // No providers folder in this module
          console.log(err);
          continue;
        }
      }
    }
  } catch (err) {
    console.error(`Error loading module providers: ${err.message}`);
  }

  return moduleProviders;
}

module.exports = { container, bootstrap,app };
