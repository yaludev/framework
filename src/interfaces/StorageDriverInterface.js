class StorageDriverInterface {
    read(filePath) {
      throw new Error('Method not implemented.');
    }
  
    write(filePath, content) {
      throw new Error('Method not implemented.');
    }
  
    delete(filePath) {
      throw new Error('Method not implemented.');
    }
  
    exists(filePath) {
      throw new Error('Method not implemented.');
    }
  
    list(directoryPath) {
      throw new Error('Method not implemented.');
    }
  }
  
  module.exports = StorageDriverInterface;
  