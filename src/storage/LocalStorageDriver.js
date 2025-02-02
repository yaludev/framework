const fs = require('node:fs').promises;
const path = require('node:path');
const StorageDriverInterface = require('../interfaces/StorageDriverInterface');

class LocalStorageDriver extends StorageDriverInterface {
  constructor(options) {
    super();
    this.basePath = options.basePath || process.cwd();
  }

  async read(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return fs.readFile(fullPath, 'utf8');
  }

  async write(filePath, content) {
    const fullPath = path.join(this.basePath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    return fs.writeFile(fullPath, content);
  }

  async delete(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    return fs.unlink(fullPath);
  }

  async exists(filePath) {
    const fullPath = path.join(this.basePath, filePath);
    try {
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  async list(directoryPath) {
    const fullPath = path.join(this.basePath, directoryPath);
    const isExists = await this.isDirectory(directoryPath);

    if(!isExists){
      return [];
    }
    return fs.readdir(fullPath);
  }

  async isDirectory(directoryPath) {
    const fullPath = path.join(this.basePath, directoryPath);
    try {
      const stat = await fs.stat(fullPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  async get(filePath) {
    // Alias for read
    return this.read(filePath);
  }
}

module.exports = LocalStorageDriver;
