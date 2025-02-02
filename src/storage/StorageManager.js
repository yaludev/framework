const LocalStorageDriver = require('./LocalStorageDriver');
const S3StorageDriver = require('./S3Driver');

class StorageManager {
  constructor(config) {
    this.config = config;
    this.drivers = {};
    this.defaultDisk = config.default || 'local';

    this.initDrivers();
  }

  initDrivers() {
    for (const [name, options] of Object.entries(this.config.disks)) {

      console.log({name,options});
      
      switch (options.driver) {
        case 'local':
          this.drivers[name] = new LocalStorageDriver(options);
          break;
        case 's3':
          this.drivers[name] = new S3StorageDriver(options);
          break;
        default:
          throw new Error(`Unsupported driver: ${options.driver}`);
      }
    }
  }

  disk(name) {
    const diskName = name || this.defaultDisk;
    const driver = this.drivers[diskName];

    if (!driver) {
      throw new Error(`Disk not found: ${diskName}`);
    }
    return driver;
  }
}

module.exports = StorageManager;
