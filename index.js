
require('module-alias/register');
const frameworkLoader = require('./loader');


// Load action classes into global.dispatch
frameworkLoader.loadActions();