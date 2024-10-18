// framework/loader.js
const fs = require('fs');
const path = require('path');

function loadActions() {
  const actionsDir = path.join(__dirname, '..', 'actions');

  // Initialize global.dispatch
  global.actions = {
    classList:[]
  };

  fs.readdirSync(actionsDir).forEach((file) => {
    const filePath = path.join(actionsDir, file);

    // Only process JavaScript files
    if (fs.statSync(filePath).isFile() && path.extname(file) === '.js') {
      const actionName = path.basename(file, '.js');
      const ActionClass = require(filePath);


      // Store the action class in global.actions
      global.actions.classList[actionName] = ActionClass;
    }
  });
}

module.exports = {
  loadActions,
};
