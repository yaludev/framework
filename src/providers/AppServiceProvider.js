const path = require('node:path');
const {getDirectoryTree} = require("../helpers")

class AppServiceProvider {
  constructor(app) {
    this.app = app;
  }


  
    register() {

        // const appsPath = this.config?.config?.app.dir;
        // const appsDir = this.config?.modulePath(appsPath)
      
        // getDirectoryTree(appsDir).forEach((dirName) => {
        //     console.log({dirName});
        // });

    //   const actionsDir = path.resolve(this.config.actionsDir || 'actions');
    //   const actions = {};

    //   this.container.bind()
  
      // Rest of the code remains the same
    }
  }
  
  module.exports = AppServiceProvider;
  