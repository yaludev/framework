const LocalStorageDriver = require('../storage/LocalStorageDriver');
const StorageManager = require('../storage/StorageManager');

class FilesystemServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    // Register the filesystem without relying on config
    this.app.singleton('filesystem', () => {
      const storageConfig = {
        default: 'local',
        disks: {
          local: {
            driver: 'local',
            basePath: this.app.getPath(), // Use the app's base path
          },
        },
      };

      return new StorageManager(storageConfig);
    });

    console.log("FilesystemServiceProvider registered");
    
  }

  boot() {

    console.log("FilesystemServiceProvider booted");


    // // Reconfigure the filesystem after config is available
    // const config = this.app.make('config');
    // const storageConfig = config.get('filesystems');

    // console.log({storageConfig});

    // // Re-register the filesystem with updated configuration
    // this.app.singleton('filesystem', () => {
    //   return new StorageManager(storageConfig);
    // });
  
  }
}

module.exports = FilesystemServiceProvider;
