// src/providers/ConfigServiceProvider.js

const path = require('path');
const fs = require('fs');
const ConfigRepository = require('../config/ConfigRepository');

class ConfigServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    console.log('ConfigServiceProvider registering');

    const configRepository = new ConfigRepository();
    const configPath = this.app.getPath('config');

    try {
      const files = fs.readdirSync(configPath);

      for (const file of files) {
        const ext = path.extname(file);
        if (ext === '.js' || ext === '.json') {
          const fullPath = path.join(configPath, file);
          const configName = path.basename(file, ext);
          let configData;

          if (ext === '.js') {
            configData = require(fullPath);
          } else if (ext === '.json') {
            const content = fs.readFileSync(fullPath, 'utf8');
            configData = JSON.parse(content);
          }

          console.log(`Loaded config: ${configName}`);

          configRepository.set(configName, configData);
        }
      }

      // Bind the config repository to the app container
      this.app.singleton('config', () => configRepository);

    } catch (err) {
      console.error(`Failed to load configuration files from ${configPath}`);
      console.error(err);
      throw err;
    }

    console.log('ConfigServiceProvider registered');
  }

  boot() {
    // Additional initialization if needed
  }
}

module.exports = ConfigServiceProvider;
