
const path = require('path');
const requireAll = require('require-all');
const ActionRegistry = require('../actions/ActionRegistry');

class ActionServiceProvider {
  constructor(app) {
    this.app = app;
    this.actions = [];
    this.actionRegistry = new ActionRegistry();
  }

  register() {
    // Register the ActionRegistry into the application container
    this.app.instance('actionRegistry', this.actionRegistry);
  }

  async boot() {
    const config = this.app.make('config');
    const moduleFolder = config.get('app.moduleFolder', 'apps');
    const basePath = this.app.getPath();
    const modulesPath = path.join(basePath, moduleFolder);

    const filesystem = this.app.make('filesystem');
    const disk = filesystem.disk();

    try {
      const moduleDirs = await disk.list(moduleFolder);

      for (const moduleDir of moduleDirs) {
        const modulePath = path.join(modulesPath, moduleDir);
        if (await disk.isDirectory(path.join(moduleFolder, moduleDir))) {
          const actionsPath = path.join(moduleFolder, moduleDir, 'actions');

          if (await disk.exists(actionsPath)) {
            // Load all action classes in the actions directory
            requireAll({
              dirname: path.join(modulesPath, moduleDir, 'actions'),
              filter: /(.+)\.js$/,
              resolve: (ActionClassOrInstance) => {
                let actionInstance;
                if (typeof ActionClassOrInstance === 'function') {
                  actionInstance = new ActionClassOrInstance(this.app); // Pass the app
                } else {
                  actionInstance = ActionClassOrInstance;
                  if (typeof actionInstance.setApp === 'function') {
                    actionInstance.setApp(this.app);
                  }
                }

                // Check if actionInstance implements required methods
                if (
                  typeof actionInstance.listenTo === 'function' &&
                  typeof actionInstance.handle === 'function'
                ) {
                  this.registerAction(actionInstance);
                } else {
                  console.warn(
                    `Action in ${actionsPath} does not implement required methods.`
                  );
                }
              },
            });
          }
        }
      }
    } catch (err) {
      console.error(
        `Failed to load actions from modules directory: ${modulesPath}`
      );
      throw err;
    }
  }

  registerAction(actionInstance) {
    const events = actionInstance.listenTo();

    if (Array.isArray(events)) {
      const eventsManager = this.app.make('events');

      events.forEach((event) => {
        // console.log(`Registering action '${actionInstance.meta().name}' to event '${event}'`);
        eventsManager.on(event, async (payload) => {
          try {
            await actionInstance.handle(payload, event);
          } catch (err) {
            console.error(
              `Error handling event '${event}' in action '${actionInstance.meta().name}':`,
              err
            );
          }
        });
      });

      // Register the action into the ActionRegistry
      this.actionRegistry.register(actionInstance);

      this.actions.push(actionInstance);
    } else {
      console.warn(
        `Action '${actionInstance.meta().name}' listenTo() method should return an array of event names.`
      );
    }
  }
}

module.exports = ActionServiceProvider;
