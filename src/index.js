require("module-alias/register");
const { container, bootstrap } = require("./bootstrap");


let appInstance = null;

async function start(config) {
  appInstance = await bootstrap(config);
  return appInstance;
}

function app() {
  if (!appInstance) {
    throw new Error('Framework has not been initialized. Please call start() first.');
  }
  return appInstance;
}

function server() {
  return app().make("http");
  // return container.resolve("route").driver();
}

function middleware() {
  return app().make("middleware");
}
function actionRegistry() {
  return app().make("actionRegistry");
}
 function event() {
  return app().make("events");
}

module.exports = {
  container,
  start,
  server,
  app,
  actionRegistry,
  event,
  get router() {
    return appInstance.make("router");
  },
  // get actionRegistry() {
  //   return appInstance.make("actionRegistry");
  // },
  // get events() {
  //   return appInstance.make('events');
  // },
  middleware,
};

// Load action classes into global.dispatch
// frameworkLoader.loadActions();
